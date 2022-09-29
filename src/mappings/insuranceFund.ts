import { VAULT_DECIMALS, fromWei } from "../utils/numbers"

import { Repaid } from "../../generated/schema"
import { Repaid as RepaidEvent } from "../../generated/InsuranceFund/InsuranceFund"
import { getOrCreateProtocol } from "../utils/stores"

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
    // protocol.totalRepaid could be null due to backward compatibility
    if (protocol.totalRepaid !== null) {
        protocol.totalRepaid = protocol.totalRepaid!.plus(repaidAmount)
    } else {
        protocol.totalRepaid = repaidAmount
    }

    // commit changes
    repaid.save()
    protocol.save()
}
