import { CollateralLiquidated, Deposited, Trader, Withdrawn } from "../../generated/schema"
import {
    CollateralLiquidated as CollateralLiquidatedEvent,
    Deposited as DepositedEvent,
    Withdrawn as WithdrawnEvent,
} from "../../generated/Vault/Vault"
import { USDCAddress } from "../constants"
import { fromWei } from "../utils/numbers"
import {
    getBlockNumberLogIndex,
    getOrCreateProtocol,
    getOrCreateProtocolTokenBalance,
    getOrCreateToken,
    getOrCreateTrader,
    getOrCreateTraderTokenBalance,
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
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // update deposited amount
    if (deposited.collateralToken.equals(USDCAddress)) {
        trader.settlementTokenBalance = trader.settlementTokenBalance.plus(amount)
        protocol.totalSettlementTokenBalance = protocol.totalSettlementTokenBalance.plus(amount)
    } else {
        const traderNonSettlementTokenBalance = getOrCreateTraderTokenBalance(
            event.params.trader,
            event.params.collateralToken,
        )
        const protocolNonSettlementTokenBalance = getOrCreateProtocolTokenBalance(event.params.collateralToken)
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
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // update withdrawn amount
    if (withdrawn.collateralToken.equals(USDCAddress)) {
        trader.settlementTokenBalance = trader.settlementTokenBalance.minus(withdrawn.amount)
        protocol.totalSettlementTokenBalance = protocol.totalSettlementTokenBalance.minus(withdrawn.amount)
    } else {
        const traderNonSettlementTokenBalance = getOrCreateTraderTokenBalance(
            event.params.trader,
            event.params.collateralToken,
        )
        const protocolNonSettlementTokenBalance = getOrCreateProtocolTokenBalance(event.params.collateralToken)
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
    const traderNonSettlementTokenBalance = getOrCreateTraderTokenBalance(
        event.params.trader,
        event.params.collateralToken,
    )
    traderNonSettlementTokenBalance.amount = traderNonSettlementTokenBalance.amount.minus(liquidatedAmount)

    // update trader's settlement token balance
    const trader = Trader.load(event.params.trader.toHexString()) as Trader
    trader.settlementTokenBalance = trader.settlementTokenBalance.plus(repayAmount)

    // update protocol's non settlement token balance
    const protocolNonSettlementTokenBalance = getOrCreateProtocolTokenBalance(event.params.collateralToken)
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
