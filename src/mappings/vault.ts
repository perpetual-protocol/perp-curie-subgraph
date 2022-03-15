import { BadDebtHappened, Deposited, Withdrawn } from "../../generated/schema"
import { Deposited as DepositedEvent, Withdrawn as WithdrawnEvent } from "../../generated/Vault/Vault"
import { USDCAddress } from "../constants"
import { getBadDebt } from "../utils/models"
import { BD_ZERO, fromWei, VAULT_DECIMALS } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocol, getOrCreateTrader } from "../utils/stores"

export function handleDeposited(event: DepositedEvent): void {
    // insert Deposited
    const deposited = new Deposited(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    deposited.blockNumberLogIndex = getBlockNumberLogIndex(event)
    deposited.blockNumber = event.block.number
    deposited.timestamp = event.block.timestamp
    deposited.txHash = event.transaction.hash
    deposited.trader = event.params.trader
    deposited.collateralToken = event.params.collateralToken
    deposited.amount = fromWei(event.params.amount, VAULT_DECIMALS)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    const oldTraderBadDebt = getBadDebt(trader.collateral)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.collateral = trader.collateral.plus(deposited.amount)
    const increasedTraderBadDebt = getBadDebt(trader.collateral).minus(oldTraderBadDebt)
    trader.badDebt = trader.badDebt.plus(increasedTraderBadDebt)

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.badDebt = protocol.badDebt.plus(increasedTraderBadDebt)
    if (deposited.collateralToken.equals(USDCAddress)) {
        protocol.totalValueLocked = protocol.totalValueLocked.plus(deposited.amount)
    } else {
        // TODO: non-USD collateral
    }
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // commit changes
    deposited.save()
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

export function handleWithdrawn(event: WithdrawnEvent): void {
    // insert Withdrawn
    const withdrawn = new Withdrawn(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    withdrawn.blockNumberLogIndex = getBlockNumberLogIndex(event)
    withdrawn.blockNumber = event.block.number
    withdrawn.timestamp = event.block.timestamp
    withdrawn.txHash = event.transaction.hash
    withdrawn.trader = event.params.trader
    withdrawn.collateralToken = event.params.collateralToken
    withdrawn.amount = fromWei(event.params.amount, VAULT_DECIMALS)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    const oldTraderBadDebt = getBadDebt(trader.collateral)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.collateral = trader.collateral.minus(withdrawn.amount)
    const increasedTraderBadDebt = getBadDebt(trader.collateral).minus(oldTraderBadDebt)
    trader.badDebt = trader.badDebt.plus(increasedTraderBadDebt)

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.badDebt = protocol.badDebt.plus(increasedTraderBadDebt)
    if (withdrawn.collateralToken.equals(USDCAddress)) {
        protocol.totalValueLocked = protocol.totalValueLocked.minus(withdrawn.amount)
    } else {
        // TODO: non-USD collateral
    }
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // commit changes
    withdrawn.save()
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
