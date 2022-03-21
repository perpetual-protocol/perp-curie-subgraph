import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
    FundingPaymentSettled as FundingPaymentSettledEvent,
    LiquidityChanged as LiquidityChangedEvent,
    PositionChanged as PositionChangedEvent,
    PositionLiquidated as PositionLiquidatedEvent,
    ReferredPositionChanged,
} from "../../generated/ClearingHouse/ClearingHouse"
import { FundingPaymentSettled, LiquidityChanged, PositionChanged, PositionLiquidated } from "../../generated/schema"
import { abs, BD_ZERO, BI_ZERO, fromSqrtPriceX96, fromWei } from "../utils/numbers"
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
    saveToPositionHistory,
} from "../utils/stores"

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
        // swappedPrice does not include fee
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
    position.realizedPnl = position.realizedPnl.plus(positionChanged.realizedPnl)
    if (position.positionSize.equals(BD_ZERO)) {
        position.entryPrice = BD_ZERO
    } else {
        position.entryPrice = abs(position.openNotional.div(position.positionSize))
    }
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
    saveToPositionHistory(position, event)
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
        openOrder.baseAmount = BD_ZERO
        openOrder.quoteAmount = BD_ZERO
        openOrder.collectedFeeInThisLifecycle = BD_ZERO
    } else {
        openOrder.baseAmount = openOrder.baseAmount.plus(liquidityChanged.base)
        openOrder.quoteAmount = openOrder.quoteAmount.plus(liquidityChanged.quote)
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
    let positionChangedLogIndex = event.logIndex.minus(BigInt.fromI32(1))
    // // the referral event shares the same tx as the positionChanged event
    let positionChangedEvent = PositionChanged.load(
        event.transaction.hash.toHexString() + "-" + positionChangedLogIndex.toString(),
    )
    let code = event.params.referralCode.toString()

    if (positionChangedEvent !== null) {
        let trader = getOrCreateTrader(event.transaction.from)
        let referralCode = getReferralCode(code)
        if (referralCode !== null) {
            let referralCodeDayData = getReferralCodeDayData(event, referralCode.id)
            let referralCodeTraderDayData = getReferralCodeTraderDayData(referralCodeDayData.id, trader.id)

            // uptick trading vol and fees for the referral code day tracking
            referralCodeDayData.tradingVolume = referralCodeDayData.tradingVolume.plus(
                abs(positionChangedEvent.exchangedPositionNotional),
            )
            referralCodeDayData.fees = referralCodeDayData.fees.plus(positionChangedEvent.fee)

            // uptick trading vol and fees for the referral code day tracking for the trader
            referralCodeTraderDayData.tradingVolume = referralCodeTraderDayData.tradingVolume.plus(
                abs(positionChangedEvent.exchangedPositionNotional),
            )
            referralCodeTraderDayData.fees = referralCodeTraderDayData.fees.plus(positionChangedEvent.fee)

            // uptick active traders for the referral code
            let activeTraders = referralCodeDayData.activeReferees
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
    }
}
