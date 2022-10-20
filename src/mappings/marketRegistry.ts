import { BigInt } from "@graphprotocol/graph-ts"
import { FeeRatioChanged, PoolAdded } from "../../generated/MarketRegistry/MarketRegistry"
import { QuoteTokenAddress } from "../constants"
import { BI_ONE } from "../utils/numbers"
import { getOrCreateMarket, getOrCreateProtocol, getOrCreateProtocolEventInfo } from "../utils/stores"

export function handlePoolAdded(event: PoolAdded): void {
    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.publicMarketCount = protocol.publicMarketCount.plus(BI_ONE)
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // upsert Market
    const market = getOrCreateMarket(event.params.baseToken)
    market.baseToken = event.params.baseToken
    market.quoteToken = QuoteTokenAddress
    market.pool = event.params.pool
    market.feeRatio = BigInt.fromI32(event.params.feeRatio) // initially it would be UniswapV3 pool's fee ratio
    market.blockNumberAdded = event.block.number
    market.timestampAdded = event.block.timestamp

    // upsert protocolEventInfo info
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
    market.feeRatio = BigInt.fromI32(event.params.feeRatio) // it would be ClearingHouse's fee ratio

    // upsert protocolEventInfo info
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "FeeRatioChanged"

    // commit changes
    protocolEventInfo.save()
    market.save()
}
