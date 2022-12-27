import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import { FeeRatioChanged, PoolAdded } from "../../generated/MarketRegistry/MarketRegistry"
import { QuoteTokenAddress } from "../constants"
import { BI_ONE, RATIO_ONE } from "../utils/numbers"
import { getOrCreateMarket, getOrCreateProtocol, getOrCreateProtocolEventInfo } from "../utils/stores"

export function handlePoolAdded(event: PoolAdded): void {
    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.publicMarketCount = protocol.publicMarketCount.plus(BI_ONE)

    // upsert Market
    const market = getOrCreateMarket(event.params.baseToken)
    market.baseToken = event.params.baseToken
    market.quoteToken = QuoteTokenAddress
    market.pool = event.params.pool
    // initially it would be UniswapV3 pool's fee ratio
    market.feeRatio = BigDecimal.fromString(event.params.feeRatio.toString()).div(RATIO_ONE)
    market.blockNumberAdded = event.block.number
    market.timestampAdded = event.block.timestamp

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "PoolAdded"

    // commit changes
    protocol.save()
    protocolEventInfo.save()
    market.save()
}

export function handleFeeRatioChanged(event: FeeRatioChanged): void {
    // upsert Market
    const market = getOrCreateMarket(event.params.baseToken)
    // it would be Perp Exchange's fee ratio
    market.feeRatio = BigDecimal.fromString(event.params.feeRatio.toString()).div(RATIO_ONE)

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "FeeRatioChanged"

    // commit changes
    protocolEventInfo.save()
    market.save()
}
