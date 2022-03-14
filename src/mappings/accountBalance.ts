import { PnlRealized as PnlRealizedEvent } from "../../generated/AccountBalance/AccountBalance"
import { BadDebtHappened, PnlRealized } from "../../generated/schema"
import { getBadDebt } from "../utils/models"
import { BD_ZERO, fromWei } from "../utils/numbers"
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
    const oldTraderBadDebt = getBadDebt(trader.collateral)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.totalPnl = trader.totalPnl.plus(pnlRealized.amount)
    trader.collateral = trader.collateral.plus(pnlRealized.amount)
    const increasedTraderBadDebt = getBadDebt(trader.collateral).minus(oldTraderBadDebt)
    trader.badDebt = trader.badDebt.plus(increasedTraderBadDebt)

    // upsert protocol
    const protocol = getOrCreateProtocol()
    protocol.badDebt = protocol.badDebt.plus(increasedTraderBadDebt)
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // commit changes
    pnlRealized.save()
    trader.save()
    protocol.save()

    // insert BadDebtHappened
    if (increasedTraderBadDebt.gt(BD_ZERO)) {
        const badDebtHappened = new BadDebtHappened(
            `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
        )
        badDebtHappened.blockNumberLogIndex = getBlockNumberLogIndex(event)
        badDebtHappened.blockNumber = event.block.number
        badDebtHappened.timestamp = event.block.timestamp
        badDebtHappened.txHash = event.transaction.hash
        badDebtHappened.trader = event.params.trader
        badDebtHappened.amount = increasedTraderBadDebt
        badDebtHappened.save()
    }
}
