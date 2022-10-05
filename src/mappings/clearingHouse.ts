import { Address, BigInt, Bytes, TypedMap } from "@graphprotocol/graph-ts"
import {
    FundingPaymentSettled as FundingPaymentSettledEvent,
    LiquidityChanged as LiquidityChangedEvent,
    PositionChanged as PositionChangedEvent,
    PositionClosed as PositionClosedEvent,
    PositionLiquidated as PositionLiquidatedEvent,
    ReferredPositionChanged,
} from "../../generated/ClearingHouse/ClearingHouse"
import {
    FundingPaymentSettled,
    LiquidityChanged,
    PositionChanged,
    PositionClosed,
    PositionLiquidated,
} from "../../generated/schema"
import { Network } from "../constants"
import { hardFixedDataMap as hardFixedDataMapOP } from "../hard-fixed-data/optimism"
import { HardFixedDataMap } from "../hard-fixed-data/types"
import { abs, BD_ZERO, BI_ZERO, DUST_POSITION_SIZE, fromSqrtPriceX96, fromWei } from "../utils/numbers"
import {
    getBlockNumberLogIndex,
    getOrCreateMaker,
    getOrCreateMarket,
    getOrCreateOpenOrder,
    getOrCreatePosition,
    getOrCreateProtocol,
    getOrCreateTrader,
    getOrCreateTraderMarket,
    getReferralCode,
    getReferralCodeDayData,
    getReferralCodeTraderDayData,
    getTraderDayData,
} from "../utils/stores"

// NOTE: always use TypedMap instead of Map, Map.get() will throw an error if the key does not exist
const map = new TypedMap<string, HardFixedDataMap>()
map.set("optimism", hardFixedDataMapOP)
const hardFixedDataMap = map.get(Network)

export function handlePositionClosed(event: PositionClosedEvent): void {
    // insert PositionClosed
    const positionClosed = new PositionClosed(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    positionClosed.txHash = event.transaction.hash
    positionClosed.trader = event.params.trader
    positionClosed.baseToken = event.params.baseToken
    positionClosed.closedPositionSize = fromWei(event.params.closedPositionSize)
    positionClosed.closedPositionNotional = fromWei(event.params.closedPositionNotional)
    positionClosed.openNotionalBeforeClose = fromWei(event.params.openNotional)
    positionClosed.realizedPnl = fromWei(event.params.realizedPnl)
    positionClosed.closedPrice = fromWei(event.params.closedPrice)

    positionClosed.blockNumberLogIndex = getBlockNumberLogIndex(event)
    positionClosed.blockNumber = event.block.number
    positionClosed.timestamp = event.block.timestamp

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.tradingVolume = protocol.tradingVolume.plus(abs(positionClosed.closedPositionNotional))
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // upsert Market
    const market = getOrCreateMarket(event.params.baseToken)
    market.blockNumber = event.block.number
    market.timestamp = event.block.timestamp
    market.tradingVolume = market.tradingVolume.plus(abs(positionClosed.closedPositionNotional))

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.tradingVolume = trader.tradingVolume.plus(abs(positionClosed.closedPositionNotional))
    trader.realizedPnl = trader.realizedPnl.plus(positionClosed.realizedPnl)

    // upsert TraderMarket
    const traderMarket = getOrCreateTraderMarket(event.params.trader, event.params.baseToken)
    traderMarket.blockNumber = event.block.number
    traderMarket.timestamp = event.block.timestamp
    traderMarket.takerPositionSize = BD_ZERO
    traderMarket.openNotional = BD_ZERO
    traderMarket.entryPrice = BD_ZERO
    traderMarket.tradingVolume = traderMarket.tradingVolume.plus(abs(positionClosed.closedPositionNotional))
    traderMarket.realizedPnl = traderMarket.realizedPnl.plus(positionClosed.realizedPnl)

    // upsert Position
    const position = getOrCreatePosition(event.params.trader, event.params.baseToken)
    position.blockNumber = event.block.number
    position.timestamp = event.block.timestamp
    // NOTE: position size does not consider maker position
    position.positionSize = BD_ZERO
    position.openNotional = BD_ZERO
    position.realizedPnl = position.realizedPnl.plus(positionClosed.realizedPnl)
    position.entryPrice = BD_ZERO
    position.tradingVolume = position.tradingVolume.plus(abs(positionClosed.closedPositionNotional))

    // update trader day data
    const traderDayData = getTraderDayData(event, event.params.trader)
    traderDayData.tradingVolume = traderDayData.tradingVolume.plus(abs(positionClosed.closedPositionNotional))
    traderDayData.realizedPnl = traderDayData.realizedPnl.plus(event.params.realizedPnl)

    // commit changes
    positionClosed.save()
    protocol.save()
    market.save()
    trader.save()
    traderMarket.save()
    position.save()
    traderDayData.save()
}

export function handlePositionChanged(event: PositionChangedEvent): void {
    // insert PositionChanged
    const positionChanged = new PositionChanged(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    positionChanged.blockNumberLogIndex = getBlockNumberLogIndex(event)
    positionChanged.blockNumber = event.block.number
    positionChanged.timestamp = event.block.timestamp
    positionChanged.txHash = event.transaction.hash
    positionChanged.trader = event.params.trader
    positionChanged.baseToken = event.params.baseToken
    positionChanged.exchangedPositionSize = fromWei(event.params.exchangedPositionSize)
    positionChanged.exchangedPositionNotional = fromWei(event.params.exchangedPositionNotional)
    positionChanged.fee = fromWei(event.params.fee)
    positionChanged.openNotional = fromWei(event.params.openNotional)
    positionChanged.realizedPnl = fromWei(event.params.realizedPnl)
    positionChanged.marketPriceAfter = fromSqrtPriceX96(event.params.sqrtPriceAfterX96)
    const functionSignature = event.transaction.input.slice(0, 4)
    positionChanged.fromFunctionSignature = Bytes.fromUint8Array(functionSignature)

    // exchangedPositionSize could be 0 if PositionChanged is from addLiquidity/removeLiquidity
    if (positionChanged.exchangedPositionSize.equals(BD_ZERO)) {
        positionChanged.swappedPrice = BD_ZERO
    } else {
        // see https://www.figma.com/file/xuue5qGH4RalX7uAbbzgP3?embed_host=notion&kind=&node-id=0%3A1&viewer=1
        // swappedPrice is already considering fee:
        // when long, fee is deducted first, then swap
        // when short, swap first, then fee is deducted
        positionChanged.swappedPrice = abs(
            positionChanged.exchangedPositionNotional.div(positionChanged.exchangedPositionSize),
        )
    }

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.tradingVolume = protocol.tradingVolume.plus(abs(positionChanged.exchangedPositionNotional))
    protocol.tradingFee = protocol.tradingFee.plus(positionChanged.fee)
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // upsert Market
    const market = getOrCreateMarket(event.params.baseToken)
    market.blockNumber = event.block.number
    market.timestamp = event.block.timestamp
    market.tradingVolume = market.tradingVolume.plus(abs(positionChanged.exchangedPositionNotional))
    market.tradingFee = market.tradingFee.plus(positionChanged.fee)
    market.baseAmount = market.baseAmount.plus(positionChanged.exchangedPositionSize)
    market.quoteAmount = market.quoteAmount.plus(positionChanged.exchangedPositionNotional)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.tradingVolume = trader.tradingVolume.plus(abs(positionChanged.exchangedPositionNotional))
    trader.realizedPnl = trader.realizedPnl.plus(positionChanged.realizedPnl)
    trader.tradingFee = trader.tradingFee.plus(positionChanged.fee)

    // upsert TraderMarket
    const traderMarket = getOrCreateTraderMarket(event.params.trader, event.params.baseToken)
    traderMarket.blockNumber = event.block.number
    traderMarket.timestamp = event.block.timestamp
    traderMarket.takerPositionSize = traderMarket.takerPositionSize.plus(positionChanged.exchangedPositionSize)
    traderMarket.openNotional = positionChanged.openNotional
    // NOTE: according to contract, a position size < 10 wei cannot be closed or liquidated so we set it to 0
    if (abs(traderMarket.takerPositionSize).lt(DUST_POSITION_SIZE)) {
        traderMarket.takerPositionSize = BD_ZERO
        traderMarket.openNotional = BD_ZERO
        traderMarket.entryPrice = BD_ZERO
    } else {
        traderMarket.entryPrice = abs(traderMarket.openNotional.div(traderMarket.takerPositionSize))
    }
    traderMarket.tradingVolume = traderMarket.tradingVolume.plus(abs(positionChanged.exchangedPositionNotional))
    traderMarket.realizedPnl = traderMarket.realizedPnl.plus(positionChanged.realizedPnl)
    traderMarket.tradingFee = traderMarket.tradingFee.plus(positionChanged.fee)

    // upsert Position
    const position = getOrCreatePosition(event.params.trader, event.params.baseToken)
    position.blockNumber = event.block.number
    position.timestamp = event.block.timestamp
    // NOTE: position size does not consider maker position
    position.positionSize = position.positionSize.plus(positionChanged.exchangedPositionSize)
    position.openNotional = positionChanged.openNotional
    // NOTE: according to contract, a position size < 10 wei cannot be closed or liquidated so we set it to 0
    if (abs(position.positionSize).lt(DUST_POSITION_SIZE)) {
        position.positionSize = BD_ZERO
        position.openNotional = BD_ZERO
        position.entryPrice = BD_ZERO
    } else {
        position.entryPrice = abs(position.openNotional.div(position.positionSize))
    }
    position.realizedPnl = position.realizedPnl.plus(positionChanged.realizedPnl)
    position.tradingVolume = position.tradingVolume.plus(abs(positionChanged.exchangedPositionNotional))
    position.tradingFee = position.tradingFee.plus(positionChanged.fee)

    positionChanged.positionSizeAfter = position.positionSize
    positionChanged.entryPriceAfter = position.entryPrice

    // update trader day data
    const traderDayData = getTraderDayData(event, event.params.trader)
    traderDayData.tradingVolume = traderDayData.tradingVolume.plus(abs(positionChanged.exchangedPositionNotional))
    traderDayData.fee = traderDayData.fee.plus(event.params.fee)
    traderDayData.realizedPnl = traderDayData.realizedPnl.plus(event.params.realizedPnl)

    // commit changes
    positionChanged.save()
    protocol.save()
    market.save()
    trader.save()
    traderMarket.save()
    position.save()
    traderDayData.save()
}

export function handlePositionLiquidated(event: PositionLiquidatedEvent): void {
    // insert PositionLiquidated
    const positionLiquidated = new PositionLiquidated(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    positionLiquidated.blockNumberLogIndex = getBlockNumberLogIndex(event)
    positionLiquidated.blockNumber = event.block.number
    positionLiquidated.timestamp = event.block.timestamp
    positionLiquidated.txHash = event.transaction.hash
    positionLiquidated.trader = event.params.trader
    positionLiquidated.baseToken = event.params.baseToken
    positionLiquidated.liquidator = event.params.liquidator
    positionLiquidated.positionNotionalAbs = fromWei(event.params.positionNotional)
    positionLiquidated.positionSizeAbs = fromWei(event.params.positionSize)
    positionLiquidated.liquidationFee = fromWei(event.params.liquidationFee)

    // upsert Position
    const position = getOrCreatePosition(event.params.trader, event.params.baseToken)
    position.blockNumber = event.block.number
    position.timestamp = event.block.timestamp
    position.liquidationFee = position.liquidationFee.plus(positionLiquidated.liquidationFee)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.liquidationFee = trader.liquidationFee.plus(positionLiquidated.liquidationFee)

    // upsert TraderMarket
    const traderMarket = getOrCreateTraderMarket(event.params.trader, event.params.baseToken)
    traderMarket.blockNumber = event.block.number
    traderMarket.timestamp = event.block.timestamp
    traderMarket.liquidationFee = traderMarket.liquidationFee.plus(positionLiquidated.liquidationFee)

    // commit changes
    positionLiquidated.save()
    position.save()
    trader.save()
    traderMarket.save()
}

export function handleLiquidityChanged(event: LiquidityChangedEvent): void {
    // insert LiquidityChanged
    const liquidityChanged = new LiquidityChanged(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    liquidityChanged.blockNumberLogIndex = getBlockNumberLogIndex(event)
    liquidityChanged.blockNumber = event.block.number
    liquidityChanged.timestamp = event.block.timestamp
    liquidityChanged.txHash = event.transaction.hash
    liquidityChanged.maker = event.params.maker
    liquidityChanged.baseToken = event.params.baseToken
    liquidityChanged.quoteToken = event.params.quoteToken
    liquidityChanged.lowerTick = BigInt.fromI32(event.params.lowerTick)
    liquidityChanged.upperTick = BigInt.fromI32(event.params.upperTick)
    liquidityChanged.base = fromWei(event.params.base)
    liquidityChanged.quote = fromWei(event.params.quote)
    liquidityChanged.liquidity = event.params.liquidity
    liquidityChanged.quoteFee = fromWei(event.params.quoteFee)
    const functionSignature = event.transaction.input.slice(0, 4)
    liquidityChanged.fromFunctionSignature = Bytes.fromUint8Array(functionSignature)

    // upsert Maker
    // NOTE: we don't remove entities from Maker table even if they have no open orders
    const maker = getOrCreateMaker(event.params.maker)
    maker.blockNumber = event.block.number
    maker.timestamp = event.block.timestamp
    maker.collectedFee = maker.collectedFee.plus(liquidityChanged.quoteFee)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.maker)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.makerFee = trader.makerFee.plus(liquidityChanged.quoteFee)

    // upsert TraderMarket
    const traderMarket = getOrCreateTraderMarket(event.params.maker, event.params.baseToken)
    traderMarket.blockNumber = event.block.number
    traderMarket.timestamp = event.block.timestamp
    traderMarket.makerFee = traderMarket.makerFee.plus(liquidityChanged.quoteFee)

    // hard fix: since some position changed events are missing when cancelExcessOrder()
    // we need to update the position size and open notional for missing events
    if (hardFixedDataMap) {
        const txHash = event.transaction.hash.toHexString()
        const baseToken = event.params.baseToken.toHexString()
        const baseTokenMap = hardFixedDataMap!.get(txHash)
        if (baseTokenMap) {
            const fixedDataMap = baseTokenMap!.get(baseToken)
            if (fixedDataMap) {
                traderMarket.takerPositionSize = fixedDataMap.get("takerPositionSize")!
                traderMarket.openNotional = fixedDataMap.get("openNotional")!

                const position = getOrCreatePosition(event.params.maker, event.params.baseToken)
                position.positionSize = fixedDataMap.get("takerPositionSize")!
                position.openNotional = fixedDataMap.get("openNotional")!
                position.save()
            }
        }
    }

    // upsert OpenOrder
    const openOrder = getOrCreateOpenOrder(
        event.params.maker,
        event.params.baseToken,
        liquidityChanged.lowerTick,
        liquidityChanged.upperTick,
    )
    openOrder.blockNumber = event.block.number
    openOrder.timestamp = event.block.timestamp
    openOrder.liquidity = openOrder.liquidity.plus(liquidityChanged.liquidity)
    if (openOrder.liquidity.equals(BI_ZERO)) {
        openOrder.collectedFeeInThisLifecycle = BD_ZERO
    } else {
        openOrder.collectedFeeInThisLifecycle = openOrder.collectedFeeInThisLifecycle.plus(liquidityChanged.quoteFee)
    }
    openOrder.collectedFee = openOrder.collectedFee.plus(liquidityChanged.quoteFee)

    // upsert market
    const market = getOrCreateMarket(event.params.baseToken)
    market.baseAmount = market.baseAmount.plus(liquidityChanged.base)
    market.quoteAmount = market.quoteAmount.plus(liquidityChanged.quote)

    // commit changes
    liquidityChanged.save()
    maker.save()
    trader.save()
    traderMarket.save()
    openOrder.save()
    market.save()
}

export function handleFundingPaymentSettled(event: FundingPaymentSettledEvent): void {
    // insert FundingPaymentSettled
    const fundingPaymentSettled = new FundingPaymentSettled(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    fundingPaymentSettled.blockNumberLogIndex = getBlockNumberLogIndex(event)
    fundingPaymentSettled.blockNumber = event.block.number
    fundingPaymentSettled.timestamp = event.block.timestamp
    fundingPaymentSettled.txHash = event.transaction.hash
    fundingPaymentSettled.trader = event.params.trader
    fundingPaymentSettled.baseToken = event.params.baseToken
    fundingPaymentSettled.fundingPayment = fromWei(event.params.fundingPayment)

    // upsert Position
    const position = getOrCreatePosition(event.params.trader, event.params.baseToken)
    position.blockNumber = event.block.number
    position.timestamp = event.block.timestamp
    position.fundingPayment = position.fundingPayment.plus(fundingPaymentSettled.fundingPayment)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.fundingPayment = trader.fundingPayment.plus(fundingPaymentSettled.fundingPayment)

    // upsert TraderMarket
    const traderMarket = getOrCreateTraderMarket(event.params.trader, event.params.baseToken)
    traderMarket.blockNumber = event.block.number
    traderMarket.timestamp = event.block.timestamp
    traderMarket.fundingPayment = traderMarket.fundingPayment.plus(fundingPaymentSettled.fundingPayment)

    // commit changes
    fundingPaymentSettled.save()
    position.save()
    trader.save()
    traderMarket.save()
}

export function handleReferralPositionChanged(event: ReferredPositionChanged): void {
    // the referral event is called right after position changed, we assume the
    // log index for the position changed is the one prior
    const positionChangedLogIndex = event.logIndex.minus(BigInt.fromI32(1))
    // // the referral event shares the same tx as the positionChanged event
    const positionChangedEvent = PositionChanged.load(
        event.transaction.hash.toHexString() + "-" + positionChangedLogIndex.toString(),
    )
    if (positionChangedEvent === null) {
        return
    }

    const code = event.params.referralCode.toString()
    const referralCode = getReferralCode(code)
    if (referralCode === null) {
        return
    }

    const tradingVolume = abs(positionChangedEvent.exchangedPositionNotional)
    const tradingFee = positionChangedEvent.fee

    // uptick trading vol and fees for the referral code day tracking
    const referralCodeDayData = getReferralCodeDayData(event, referralCode.id)
    referralCodeDayData.tradingVolume = referralCodeDayData.tradingVolume.plus(tradingVolume)
    referralCodeDayData.fees = referralCodeDayData.fees.plus(tradingFee)

    // start from timestamp 1660435200 (2022-08-14T00:00:00.000Z)
    // trader is changed from tx sender to the one whose position has changed
    const traderAddr = event.block.timestamp.ge(BigInt.fromI32(1660435200))
        ? Address.fromBytes(positionChangedEvent.trader)
        : event.transaction.from
    const trader = getOrCreateTrader(traderAddr)
    // uptick trading vol and fees for the referral code day tracking for the trader
    const referralCodeTraderDayData = getReferralCodeTraderDayData(referralCodeDayData.id, trader.id)
    referralCodeTraderDayData.tradingVolume = referralCodeTraderDayData.tradingVolume.plus(tradingVolume)
    referralCodeTraderDayData.fees = referralCodeTraderDayData.fees.plus(tradingFee)

    // uptick active traders for the referral code
    const activeTraders = referralCodeDayData.activeReferees
    if (!activeTraders.includes(trader.id)) {
        activeTraders.push(trader.id)
        referralCodeDayData.activeReferees = activeTraders
    }

    // Add the referrer code to the position changed event itself
    positionChangedEvent.referralCode = code

    referralCodeDayData.save()
    referralCodeTraderDayData.save()
    positionChangedEvent.save()
}
