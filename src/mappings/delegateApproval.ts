import { BigInt } from "@graphprotocol/graph-ts"
import {
    DelegationApproved as DelegationApprovedEvent,
    DelegationRevoked as DelegationRevokedEvent,
} from "../../generated/DelegateApproval/DelegateApproval"
import { DelegationApproved, DelegationRevoked } from "../../generated/schema"
import { getBlockNumberLogIndex, getOrCreateProtocol, getOrCreateProtocolEventInfo } from "../utils/stores"

export function handleDelegationApproved(event: DelegationApprovedEvent): void {
    // insert DelegationApproved
    const delegationApproved = new DelegationApproved(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    delegationApproved.blockNumberLogIndex = getBlockNumberLogIndex(event)
    delegationApproved.blockNumber = event.block.number
    delegationApproved.timestamp = event.block.timestamp
    delegationApproved.txHash = event.transaction.hash
    delegationApproved.trader = event.params.trader
    delegationApproved.delegate = event.params.delegate
    delegationApproved.actions = BigInt.fromI32(event.params.actions)

    // update protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "DelegationApproved"

    // commit changes
    delegationApproved.save()
    protocol.save()
    protocolEventInfo.save()
}

export function handleDelegationRevoked(event: DelegationRevokedEvent): void {
    // insert DelegationRevoked
    const delegationRevoked = new DelegationRevoked(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    delegationRevoked.blockNumberLogIndex = getBlockNumberLogIndex(event)
    delegationRevoked.blockNumber = event.block.number
    delegationRevoked.timestamp = event.block.timestamp
    delegationRevoked.txHash = event.transaction.hash
    delegationRevoked.trader = event.params.trader
    delegationRevoked.delegate = event.params.delegate
    delegationRevoked.actions = BigInt.fromI32(event.params.actions)

    // update protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "DelegationRevoked"

    // commit changes
    delegationRevoked.save()
    protocol.save()
    protocolEventInfo.save()
}
