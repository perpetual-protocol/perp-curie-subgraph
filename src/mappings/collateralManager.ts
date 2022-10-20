import { BigInt } from "@graphprotocol/graph-ts"
import { CollateralAdded as CollateralAddedEvent } from "../../generated/CollateralManager/CollateralManager"
import { Token } from "../../generated/schema"
import { getOrCreateProtocolEventInfo } from "../utils/stores"
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "../utils/token"

export function handleCollateralAdded(event: CollateralAddedEvent): void {
    const tokenAddr = event.params.token
    const token = new Token(tokenAddr.toHexString())
    token.name = fetchTokenName(tokenAddr)
    token.symbol = fetchTokenSymbol(tokenAddr)
    token.decimals = fetchTokenDecimals(tokenAddr)

    // upsert protocolEventInfo info
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "CollateralAdded"

    // commit changes
    token.save()
    protocolEventInfo.save()
}
