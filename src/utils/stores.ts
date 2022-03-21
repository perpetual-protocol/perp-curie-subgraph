import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
    Maker,
    Market,
    OpenOrder,
    Position,
    PositionHistory,
    Protocol,
    ReferralCode,
    ReferralCodeDayData,
    ReferralCodeTraderDayData,
    Trader,
    TraderDayData,
    TraderMarket,
} from "../../generated/schema"
import { ChainId, Network, Version } from "../constants"
import { ADDRESS_ZERO, BD_ZERO, BI_ONE, BI_ZERO } from "./numbers"

export function getBlockNumberLogIndex(event: ethereum.Event): BigInt {
    return event.block.number.times(BigInt.fromI32(1000)).plus(event.logIndex)
}

export function getOrCreateProtocol(): Protocol {
    const protocolId = "perpetual-protocol"
    let protocol = Protocol.load(protocolId)
    if (!protocol) {
        protocol = new Protocol(protocolId)
        protocol.network = Network
        protocol.chainId = ChainId
        protocol.contractVersion = Version
        protocol.publicMarketCount = BI_ZERO
        protocol.tradingFee = BD_ZERO
        protocol.tradingVolume = BD_ZERO
        protocol.totalValueLocked = BD_ZERO
        protocol.badDebt = BD_ZERO
        protocol.blockNumber = BI_ZERO
        protocol.timestamp = BI_ZERO
        protocol.save()
    }
    return protocol
}

export function formatMarketId(baseToken: Address): string {
    return baseToken.toHexString()
}

export function getOrCreateMarket(baseToken: Address): Market {
    const marketId = formatMarketId(baseToken)
    let market = Market.load(marketId)
    if (!market) {
        market = new Market(marketId)
        market.baseToken = Address.fromString(ADDRESS_ZERO)
        market.quoteToken = Address.fromString(ADDRESS_ZERO)
        market.pool = Address.fromString(ADDRESS_ZERO)
        market.feeRatio = BI_ZERO
        market.tradingFee = BD_ZERO
        market.tradingVolume = BD_ZERO
        market.baseAmount = BD_ZERO
        market.quoteAmount = BD_ZERO
        market.blockNumberAdded = BI_ZERO
        market.timestampAdded = BI_ZERO
        market.blockNumber = BI_ZERO
        market.timestamp = BI_ZERO
        market.save()
    }
    return market
}

export function formatTraderId(trader: Address): string {
    return trader.toHexString()
}

export function getOrCreateTrader(traderAddr: Address): Trader {
    const traderId = formatTraderId(traderAddr)
    let trader = Trader.load(traderId)
    if (!trader) {
        trader = new Trader(traderId)
        trader.collateral = BD_ZERO
        trader.tradingVolume = BD_ZERO
        trader.realizedPnl = BD_ZERO
        trader.fundingPayment = BD_ZERO
        trader.tradingFee = BD_ZERO
        trader.liquidationFee = BD_ZERO
        trader.makerFee = BD_ZERO
        trader.totalPnl = BD_ZERO
        trader.badDebt = BD_ZERO
        trader.blockNumber = BI_ZERO
        trader.timestamp = BI_ZERO
        trader.refereeCode = ""
        trader.referrerCode = ""
        trader.save()
    }
    return trader
}

export function formatTraderMarketId(trader: Address, baseToken: Address): string {
    return `${trader.toHexString()}-${baseToken.toHexString()}`
}

export function getOrCreateTraderMarket(traderAddr: Address, baseToken: Address): TraderMarket {
    const id = formatTraderMarketId(traderAddr, baseToken)
    let traderMarket = TraderMarket.load(id)
    if (!traderMarket) {
        traderMarket = new TraderMarket(id)
        traderMarket.trader = traderAddr
        traderMarket.baseToken = baseToken
        traderMarket.tradingVolume = BD_ZERO
        traderMarket.realizedPnl = BD_ZERO
        traderMarket.fundingPayment = BD_ZERO
        traderMarket.tradingFee = BD_ZERO
        traderMarket.liquidationFee = BD_ZERO
        traderMarket.makerFee = BD_ZERO
        traderMarket.blockNumber = BI_ZERO
        traderMarket.timestamp = BI_ZERO
        traderMarket.traderRef = formatTraderId(traderAddr)
        traderMarket.marketRef = formatMarketId(baseToken)
        traderMarket.save()
    }
    return traderMarket
}

export function formatPositionId(trader: Address, baseToken: Address): string {
    return `${trader.toHexString()}-${baseToken.toHexString()}`
}

export function getOrCreatePosition(trader: Address, baseToken: Address): Position {
    const positionId = formatPositionId(trader, baseToken)
    let position = Position.load(positionId)
    if (!position) {
        position = new Position(positionId)
        position.trader = trader
        position.baseToken = baseToken
        position.positionSize = BD_ZERO
        position.openNotional = BD_ZERO
        position.entryPrice = BD_ZERO
        position.tradingVolume = BD_ZERO
        position.realizedPnl = BD_ZERO
        position.fundingPayment = BD_ZERO
        position.tradingFee = BD_ZERO
        position.liquidationFee = BD_ZERO
        position.blockNumber = BI_ZERO
        position.timestamp = BI_ZERO
        position.traderRef = formatTraderId(trader)
        position.marketRef = formatMarketId(baseToken)
        position.save()
    }
    return position
}

function formatMakerId(makerAddr: Address): string {
    return makerAddr.toHexString()
}

export function getOrCreateMaker(makerAddr: Address): Maker {
    const makerId = formatMakerId(makerAddr)
    let maker = Maker.load(makerId)
    if (!maker) {
        maker = new Maker(makerId)
        maker.blockNumber = BI_ZERO
        maker.timestamp = BI_ZERO
        maker.collectedFee = BD_ZERO
        maker.save()
    }
    return maker
}

function formatOpenOrderId(makerAddr: Address, baseToken: Address, lowerTick: BigInt, upperTick: BigInt): string {
    return `${makerAddr.toHexString()}-${baseToken.toHexString()}-${lowerTick.toString()}-${upperTick.toString()}`
}

export function getOrCreateOpenOrder(
    makerAddr: Address,
    baseToken: Address,
    lowerTick: BigInt,
    upperTick: BigInt,
): OpenOrder {
    const openOrderId = formatOpenOrderId(makerAddr, baseToken, lowerTick, upperTick)
    let openOrder = OpenOrder.load(openOrderId)
    if (!openOrder) {
        openOrder = new OpenOrder(openOrderId)
        openOrder.maker = makerAddr
        openOrder.baseToken = baseToken
        openOrder.lowerTick = lowerTick
        openOrder.upperTick = upperTick
        openOrder.baseAmount = BD_ZERO
        openOrder.quoteAmount = BD_ZERO
        openOrder.liquidity = BI_ZERO
        openOrder.collectedFee = BD_ZERO
        openOrder.collectedFeeInThisLifecycle = BD_ZERO
        openOrder.blockNumber = BI_ZERO
        openOrder.timestamp = BI_ZERO
        openOrder.makerRef = formatMakerId(makerAddr)
        openOrder.marketRef = formatMarketId(baseToken)
        openOrder.save()
    }
    return openOrder
}

export function saveToPositionHistory(position: Position, event: ethereum.Event): void {
    const positionHistoryId = position.id + "-" + `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`
    const positionHistory = new PositionHistory(positionHistoryId)
    positionHistory.trader = position.trader
    positionHistory.baseToken = position.baseToken
    positionHistory.positionSize = position.positionSize
    positionHistory.openNotional = position.openNotional
    positionHistory.entryPrice = position.entryPrice
    positionHistory.realizedPnl = position.realizedPnl
    positionHistory.fundingPayment = position.fundingPayment
    positionHistory.tradingFee = position.tradingFee
    positionHistory.liquidationFee = position.liquidationFee
    positionHistory.blockNumber = position.blockNumber
    positionHistory.timestamp = position.timestamp
    positionHistory.save()
}

export function getTraderDayData(event: ethereum.Event, trader: Address): TraderDayData {
    let _trader = getOrCreateTrader(trader)
    let timestamp = event.block.timestamp.toI32()
    let dayID = timestamp / 86400
    let id = _trader.id + "-" + dayID.toString()

    let dayData = TraderDayData.load(id)
    let dayStartTimestamp = dayID * 86400

    if (!dayData) {
        dayData = new TraderDayData(id)
        dayData.date = BigInt.fromI32(dayStartTimestamp)
        dayData.fee = BI_ZERO
        dayData.tradingVolume = BD_ZERO
        dayData.realizedPnl = BI_ZERO
        dayData.trader = _trader.id
        dayData.save()
    }
    return dayData!
}

export function createReferralCode(referralCode: string, referrer: Address, createdAt: BigInt): ReferralCode {
    let _referralCode = new ReferralCode(referralCode)
    let _referrer = getOrCreateTrader(referrer)
    _referralCode.referrer = _referrer.id
    _referralCode.createdAt = createdAt
    _referralCode.registeredOnChain = true
    _referralCode.numReferees = BI_ONE
    _referralCode.save()
    return _referralCode!
}

export function createBlankReferralCode(referralCode: string): ReferralCode {
    let _referralCode = new ReferralCode(referralCode)
    _referralCode.referrer = ADDRESS_ZERO
    _referralCode.createdAt = BI_ZERO
    _referralCode.registeredOnChain = false
    _referralCode.numReferees = BI_ONE
    _referralCode.save()
    return _referralCode
}

export function getReferralCode(referralCode: string): ReferralCode {
    let _referralCode = ReferralCode.load(referralCode)
    if (!_referralCode) {
        _referralCode = createBlankReferralCode(referralCode)
    }
    return _referralCode!
}

export function getReferralCodeDayData(event: ethereum.Event, referralCode: string): ReferralCodeDayData {
    let timestamp = event.block.timestamp.toI32()
    let dayID = timestamp / 86400
    let id = referralCode + "-" + dayID.toString()
    let dayData = ReferralCodeDayData.load(id)
    let dayStartTimestamp = dayID * 86400

    if (!dayData) {
        dayData = new ReferralCodeDayData(id)
        dayData.referralCode = referralCode
        dayData.tradingVolume = BD_ZERO
        dayData.fees = BD_ZERO
        dayData.date = BigInt.fromI32(dayStartTimestamp)
        dayData.newReferees = []
        dayData.activeReferees = []
        dayData.save()
    }
    return dayData!
}

export function getReferralCodeTraderDayData(dayDataId: string, trader: string): ReferralCodeTraderDayData {
    let id = dayDataId + "-" + trader
    let tradeData = ReferralCodeTraderDayData.load(id)
    if (!tradeData) {
        tradeData = new ReferralCodeTraderDayData(id)
        tradeData.fees = BD_ZERO
        tradeData.tradingVolume = BD_ZERO
        tradeData.referralCodeDayData = dayDataId
        tradeData.trader = trader
        tradeData.save()
    }
    return tradeData
}

export function removeAddressFromList(addresses: string[], addressToRemove: string): string[] {
    let spliceIndex = -1
    for (let i = 0; i < addresses.length; ++i) {
        if (addressToRemove == addresses[i]) {
            spliceIndex = i
        }
    }
    if (spliceIndex > -1) {
        addresses.splice(spliceIndex, 1)
    }
    return addresses
}
