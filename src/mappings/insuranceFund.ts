import { BigInt } from "@graphprotocol/graph-ts"
import {
    FeeDistributed as FeeDistributedEvent,
    Repaid as RepaidEvent,
    ThresholdChanged as ThresholdChangedEvent,
} from "../../generated/InsuranceFund/InsuranceFund"
import { FeeDistributed, Repaid, ThresholdChanged } from "../../generated/schema"
import { fromWei, VAULT_DECIMALS } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocol, getOrCreateProtocolEventInfo } from "../utils/stores"

export function handleFeeDistributed(event: FeeDistributedEvent): void {
    const surplus = fromWei(event.params.surplus, VAULT_DECIMALS)

    // insert feeDistributed
    const feeDistributed = new FeeDistributed(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    feeDistributed.timestamp = event.block.timestamp
    feeDistributed.surplus = surplus
    feeDistributed.insuranceFundCapacity = fromWei(event.params.insuranceFundCapacity, VAULT_DECIMALS)
    feeDistributed.insuranceFundFreeCollateral = fromWei(event.params.insuranceFundFreeCollateral, VAULT_DECIMALS)
    feeDistributed.threshold = fromWei(event.params.threshold, VAULT_DECIMALS)
    feeDistributed.caller = event.transaction.from

    // update protocol
    const protocol = getOrCreateProtocol()
    protocol.insuranceFundFeeDistributionTotalAmount = protocol.insuranceFundFeeDistributionTotalAmount.plus(surplus)

    // commit changes
    feeDistributed.save()
    protocol.save()
}

export function handleThresholdChanged(event: ThresholdChangedEvent): void {
    const threshold = fromWei(event.params.threshold, VAULT_DECIMALS)

    // insert thresholdChanged
    const thresholdChanged = new ThresholdChanged(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    thresholdChanged.timestamp = event.block.timestamp
    thresholdChanged.threshold = threshold

    // update protocol
    const protocol = getOrCreateProtocol()
    protocol.insuranceFundFeeDistributionThreshold = threshold

    // commit changes
    thresholdChanged.save()
    protocol.save()
}

export function handleRepaid(event: RepaidEvent): void {
    const repaidAmount = fromWei(event.params.repaidAmount, VAULT_DECIMALS)
    const tokenBalanceAfterRepaid = fromWei(event.params.tokenBalanceAfterRepaid, VAULT_DECIMALS)

    // insert Repaid
    const repaid = new Repaid(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    repaid.repaidAmount = repaidAmount
    repaid.tokenBalanceAfterRepaid = tokenBalanceAfterRepaid
    repaid.caller = event.transaction.from
    repaid.blockNumberLogIndex = getBlockNumberLogIndex(event)
    repaid.blockNumber = event.block.number
    repaid.timestamp = event.block.timestamp

    // update protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // protocol.totalRepaid could be null due to backward compatibility
    if (protocol.totalRepaid !== null) {
        protocol.totalRepaid = protocol.totalRepaid!.plus(repaidAmount)
    } else {
        protocol.totalRepaid = repaidAmount
    }

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "Repaid"

    // commit changes
    repaid.save()
    protocol.save()
    protocolEventInfo.save()
}
