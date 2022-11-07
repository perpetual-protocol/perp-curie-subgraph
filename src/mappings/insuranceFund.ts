import { BigInt } from "@graphprotocol/graph-ts"
import { Repaid as RepaidEvent } from "../../generated/InsuranceFund/InsuranceFund"
import { Repaid } from "../../generated/schema"
import { fromWei, VAULT_DECIMALS } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocol, getOrCreateProtocolEventInfo } from "../utils/stores"

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
