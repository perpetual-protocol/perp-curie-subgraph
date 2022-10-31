import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import { CollateralAdded as CollateralAddedEvent } from "../../generated/CollateralManager/CollateralManager"
import { CollateralAdded, Token } from "../../generated/schema"
import { fromWei, RATIO_ONE } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocolEventInfo } from "../utils/stores"
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "../utils/token"

export function handleCollateralAdded(event: CollateralAddedEvent): void {
    // insert CollateralAdded
    const collateralAdded = new CollateralAdded(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    collateralAdded.blockNumberLogIndex = getBlockNumberLogIndex(event)
    collateralAdded.blockNumber = event.block.number
    collateralAdded.timestamp = event.block.timestamp
    collateralAdded.txHash = event.transaction.hash
    collateralAdded.token = event.params.token
    collateralAdded.priceFeed = event.params.priceFeed
    collateralAdded.collateralRatio = BigDecimal.fromString(event.params.collateralRatio.toString()).div(RATIO_ONE)
    collateralAdded.discountRatio = BigDecimal.fromString(event.params.discountRatio.toString()).div(RATIO_ONE)
    collateralAdded.depositCap = fromWei(event.params.depositCap)

    const tokenAddr = event.params.token
    const token = new Token(tokenAddr.toHexString())
    token.name = fetchTokenName(tokenAddr)
    token.symbol = fetchTokenSymbol(tokenAddr)
    token.decimals = fetchTokenDecimals(tokenAddr)

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "CollateralAdded"

    // commit changes
    collateralAdded.save()
    token.save()
    protocolEventInfo.save()
}
