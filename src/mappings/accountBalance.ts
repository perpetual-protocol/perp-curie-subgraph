import { BigInt } from "@graphprotocol/graph-ts"
import { PnlRealized as PnlRealizedEvent } from "../../generated/AccountBalance/AccountBalance"
import { PnlRealized } from "../../generated/schema"
import { fromWei } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocolEventInfo, getOrCreateTrader } from "../utils/stores"

export function handlePnlRealized(event: PnlRealizedEvent): void {
    // insert PnlRealized
    const pnlRealized = new PnlRealized(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    pnlRealized.blockNumberLogIndex = getBlockNumberLogIndex(event)
    pnlRealized.blockNumber = event.block.number
    pnlRealized.timestamp = event.block.timestamp
    pnlRealized.txHash = event.transaction.hash
    pnlRealized.trader = event.params.trader
    pnlRealized.amount = fromWei(event.params.amount)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.totalPnl = trader.totalPnl.plus(pnlRealized.amount)
    trader.settlementTokenBalance = trader.settlementTokenBalance.plus(pnlRealized.amount)

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "PnlRealized"

    // commit changes
    pnlRealized.save()
    trader.save()
    protocolEventInfo.save()
}
