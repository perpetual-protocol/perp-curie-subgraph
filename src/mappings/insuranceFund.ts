import { FeeDistributed, ThresholdChanged } from "../../generated/schema"
import {
    FeeDistributed as FeeDistributedEvent,
    ThresholdChanged as ThresholdChangedEvent,
} from "../../generated/InsuranceFund/InsuranceFund"
import { VAULT_DECIMALS, fromWei } from "../utils/numbers"

import { Repaid } from "../../generated/schema"
import { Repaid as RepaidEvent } from "../../generated/InsuranceFund/InsuranceFund"
import { getOrCreateProtocol } from "../utils/stores"

export function handleFeeDistributed(event: FeeDistributedEvent): void {
    const surplus = fromWei(event.params.surplus, VAULT_DECIMALS)

    // insert feeDistributed
    const feeDistributed = new FeeDistributed(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    feeDistributed.timestamp = event.block.timestamp
    feeDistributed.surplus = surplus
    feeDistributed.insuranceFundWalletBalance = fromWei(event.params.insuranceFundWalletBalance, VAULT_DECIMALS)
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

    // insert repaid
    const repaid = new Repaid(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    repaid.repaidAmount = repaidAmount
    repaid.tokenBalanceAfterRepaid = tokenBalanceAfterRepaid
    repaid.caller = event.transaction.from

    // update protocol
    const protocol = getOrCreateProtocol()
    protocol.totalRepaid = protocol.totalRepaid.plus(repaidAmount)

    // commit changes
    repaid.save()
    protocol.save()
}
