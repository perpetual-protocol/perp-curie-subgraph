import { PnlRealized as PnlRealizedEvent } from "../../generated/AccountBalance/AccountBalance"
import { PnlRealized } from "../../generated/schema"
import { fromWei } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocol, getOrCreateTrader } from "../utils/stores"

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

    // upsert protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // commit changes
    pnlRealized.save()
    trader.save()
    protocol.save()
}
