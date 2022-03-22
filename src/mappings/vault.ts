import { Address } from "@graphprotocol/graph-ts"
import {
    BadDebtHappened,
    CollateralLiquidated,
    Deposited,
    TokenBalance,
    Trader,
    Withdrawn,
} from "../../generated/schema"
import {
    CollateralLiquidated as CollateralLiquidatedEvent,
    Deposited as DepositedEvent,
    Withdrawn as WithdrawnEvent,
} from "../../generated/Vault/Vault"
import { USDCAddress } from "../constants"
import { getBadDebt } from "../utils/models"
import { ADDRESS_ZERO, BD_ZERO, fromWei } from "../utils/numbers"
import {
    formatTokenBalanceId,
    getBlockNumberLogIndex,
    getOrCreateProtocol,
    getOrCreateToken,
    getOrCreateTokenBalance,
    getOrCreateTrader,
} from "../utils/stores"

export function handleDeposited(event: DepositedEvent): void {
    // upsert Token
    const token = getOrCreateToken(event.params.collateralToken)
    const amount = fromWei(event.params.amount, token.decimals)
    token.totalDeposited = token.totalDeposited.plus(amount)

    // insert Deposited
    const deposited = new Deposited(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    deposited.blockNumberLogIndex = getBlockNumberLogIndex(event)
    deposited.blockNumber = event.block.number
    deposited.timestamp = event.block.timestamp
    deposited.txHash = event.transaction.hash
    deposited.trader = event.params.trader
    deposited.collateralToken = event.params.collateralToken
    deposited.amount = amount

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    const oldTraderBadDebt = getBadDebt(trader.settlementTokenBalance)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp

    const increasedTraderBadDebt = getBadDebt(trader.settlementTokenBalance).minus(oldTraderBadDebt)
    trader.badDebt = trader.badDebt.plus(increasedTraderBadDebt)

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.badDebt = protocol.badDebt.plus(increasedTraderBadDebt)
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // update deposited amount
    if (deposited.collateralToken.equals(USDCAddress)) {
        trader.settlementTokenBalance = trader.settlementTokenBalance.plus(amount)
        protocol.totalSettlementTokenBalance = protocol.totalSettlementTokenBalance.plus(amount)
    } else {
        const traderNonSettlementTokenBalance = getOrCreateTokenBalance(event.params.trader, deposited.collateralToken)
        const protocolNonSettlementTokenBalance = getOrCreateTokenBalance(
            Address.fromString(ADDRESS_ZERO),
            deposited.collateralToken,
        )
        traderNonSettlementTokenBalance.amount = traderNonSettlementTokenBalance.amount.plus(amount)
        protocolNonSettlementTokenBalance.amount = protocolNonSettlementTokenBalance.amount.plus(amount)
        traderNonSettlementTokenBalance.save()
        protocolNonSettlementTokenBalance.save()
    }

    // commit changes
    token.save()
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
    // upsert Token
    const token = getOrCreateToken(event.params.collateralToken)
    const amount = fromWei(event.params.amount, token.decimals)
    token.totalDeposited = token.totalDeposited.minus(amount)

    // insert Withdrawn
    const withdrawn = new Withdrawn(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    withdrawn.blockNumberLogIndex = getBlockNumberLogIndex(event)
    withdrawn.blockNumber = event.block.number
    withdrawn.timestamp = event.block.timestamp
    withdrawn.txHash = event.transaction.hash
    withdrawn.trader = event.params.trader
    withdrawn.collateralToken = event.params.collateralToken
    withdrawn.amount = amount

    // upsert Trader
    const trader = getOrCreateTrader(event.params.trader)
    const oldTraderBadDebt = getBadDebt(trader.settlementTokenBalance)
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    const increasedTraderBadDebt = getBadDebt(trader.settlementTokenBalance).minus(oldTraderBadDebt)
    trader.badDebt = trader.badDebt.plus(increasedTraderBadDebt)

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.badDebt = protocol.badDebt.plus(increasedTraderBadDebt)
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // update withdrawn amount
    if (withdrawn.collateralToken.equals(USDCAddress)) {
        trader.settlementTokenBalance = trader.settlementTokenBalance.minus(withdrawn.amount)
        protocol.totalSettlementTokenBalance = protocol.totalSettlementTokenBalance.minus(withdrawn.amount)
    } else {
        const traderNonSettlementTokenBalance = getOrCreateTokenBalance(event.params.trader, withdrawn.collateralToken)
        const protocolNonSettlementTokenBalance = getOrCreateTokenBalance(
            Address.fromString(ADDRESS_ZERO),
            withdrawn.collateralToken,
        )
        traderNonSettlementTokenBalance.amount = traderNonSettlementTokenBalance.amount.minus(withdrawn.amount)
        protocolNonSettlementTokenBalance.amount = protocolNonSettlementTokenBalance.amount.minus(withdrawn.amount)
        traderNonSettlementTokenBalance.save()
        protocolNonSettlementTokenBalance.save()
    }

    // commit changes
    token.save()
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

export function handleCollateralLiquidated(event: CollateralLiquidatedEvent): void {
    // upsert Token
    const collateralToken = getOrCreateToken(event.params.collateralToken)
    const liquidatedAmount = fromWei(event.params.collateralTokenAmount, collateralToken.decimals)
    const settlementToken = getOrCreateToken(USDCAddress)
    const repayAmount = fromWei(event.params.repayAmountX10_D, settlementToken.decimals)
    const insuranceFundFee = fromWei(event.params.insuranceFundFeeX10_D, settlementToken.decimals)

    // insert CollateralLiquidated
    const collateralLiquidated = new CollateralLiquidated(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    collateralLiquidated.blockNumberLogIndex = getBlockNumberLogIndex(event)
    collateralLiquidated.blockNumber = event.block.number
    collateralLiquidated.timestamp = event.block.timestamp
    collateralLiquidated.txHash = event.transaction.hash
    collateralLiquidated.trader = event.params.trader
    collateralLiquidated.collateralToken = event.params.collateralToken
    collateralLiquidated.liquidator = event.params.liquidator
    collateralLiquidated.amount = liquidatedAmount
    collateralLiquidated.repayAmount = repayAmount
    collateralLiquidated.insuranceFundFee = insuranceFundFee

    // update trader's non settlement token balance
    const traderNonSettlementTokenBalance = TokenBalance.load(
        formatTokenBalanceId(collateralLiquidated.trader, collateralLiquidated.collateralToken),
    )
    traderNonSettlementTokenBalance.amount = traderNonSettlementTokenBalance.amount.minus(liquidatedAmount)

    // update trader's settlement token balance
    const trader = Trader.load(collateralLiquidated.trader.toHexString())
    trader.settlementTokenBalance = trader.settlementTokenBalance.plus(repayAmount)

    // update protocol's non settlement token balance
    const protocolNonSettlementTokenBalance = TokenBalance.load(
        formatTokenBalanceId(Address.fromString(ADDRESS_ZERO), collateralLiquidated.collateralToken),
    )
    protocolNonSettlementTokenBalance.amount = protocolNonSettlementTokenBalance.amount.minus(liquidatedAmount)

    // update protocol's settlement token balance
    const protocol = getOrCreateProtocol()
    protocol.totalSettlementTokenBalance = protocol.totalSettlementTokenBalance.plus(repayAmount).plus(insuranceFundFee)

    collateralToken.save()
    settlementToken.save()
    collateralLiquidated.save()
    traderNonSettlementTokenBalance.save()
    trader.save()
    protocolNonSettlementTokenBalance.save()
    protocol.save()
}
