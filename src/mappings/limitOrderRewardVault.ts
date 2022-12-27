import { BigInt } from "@graphprotocol/graph-ts"
import { Disbursed as DisbursedEvent } from "../../generated/LimitOrderRewardVault/LimitOrderRewardVault"
import { Disbursed } from "../../generated/schema"
import { fromWei } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocolEventInfo } from "../utils/stores"

export function handleDisbursed(event: DisbursedEvent): void {
    // insert Disbursed
    const disbursed = new Disbursed(`${event.params.orderHash.toHexString()}}`)
    disbursed.blockNumberLogIndex = getBlockNumberLogIndex(event)
    disbursed.blockNumber = event.block.number
    disbursed.timestamp = event.block.timestamp
    disbursed.txHash = event.transaction.hash
    disbursed.orderHash = event.params.orderHash
    disbursed.keeper = event.params.keeper
    disbursed.token = event.params.token
    disbursed.amount = fromWei(event.params.amount)

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "Disbursed"

    // commit changes
    disbursed.save()
    protocolEventInfo.save()
}
