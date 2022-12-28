import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import { BadDebtSettled, CollateralLiquidated, Deposited, Trader, Withdrawn } from "../../generated/schema"
import {
    BadDebtSettled as BadDebtSettledEvent,
    CollateralLiquidated as CollateralLiquidatedEvent,
    Deposited as DepositedEvent,
    Withdrawn as WithdrawnEvent,
} from "../../generated/Vault/Vault"
import { USDCAddress, Version } from "../constants"
import { fromWei, RATIO_ONE, VAULT_DECIMALS } from "../utils/numbers"
import {
    formatTraderId,
    getBlockNumberLogIndex,
    getOrCreateProtocol,
    getOrCreateProtocolEventInfo,
    getOrCreateProtocolTokenBalance,
    getOrCreateToken,
    getOrCreateTrader,
    getOrCreateTraderTokenBalance,
} from "../utils/stores"

export function handleDeposited(event: DepositedEvent): void {
    // upsert Token
    const token = getOrCreateToken(event.params.collateralToken)
    const amount = fromWei(event.params.amount, token.decimals)

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
    protocol.contractVersion = Version
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

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "Deposited"

    // commit changes
    deposited.save()
    trader.save()
    protocol.save()
    protocolEventInfo.save()
}

export function handleWithdrawn(event: WithdrawnEvent): void {
    // upsert Token
    const token = getOrCreateToken(event.params.collateralToken)
    const amount = fromWei(event.params.amount, token.decimals)

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

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "Withdrawn"

    // commit changes
    withdrawn.save()
    trader.save()
    protocol.save()
    protocolEventInfo.save()
}

export function handleCollateralLiquidated(event: CollateralLiquidatedEvent): void {
    const collateralToken = getOrCreateToken(event.params.collateralToken)
    const liquidatedAmount = fromWei(event.params.collateral, collateralToken.decimals)
    const settlementToken = getOrCreateToken(USDCAddress)
    const repaidSettlementWithoutInsuranceFundFee = fromWei(
        event.params.repaidSettlementWithoutInsuranceFundFeeX10_S,
        settlementToken.decimals,
    )
    const insuranceFundFee = fromWei(event.params.insuranceFundFeeX10_S, settlementToken.decimals)

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
    collateralLiquidated.collateral = liquidatedAmount
    collateralLiquidated.repaidSettlementWithoutInsuranceFundFee = repaidSettlementWithoutInsuranceFundFee
    collateralLiquidated.insuranceFundFee = insuranceFundFee
    collateralLiquidated.discountRatio = BigDecimal.fromString(event.params.discountRatio.toString()).div(RATIO_ONE)

    // upsert Trader
    const trader = Trader.load(formatTraderId(event.params.trader)) as Trader
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp
    trader.settlementTokenBalance = trader.settlementTokenBalance.plus(repaidSettlementWithoutInsuranceFundFee)

    const traderNonSettlementTokenBalance = getOrCreateTraderTokenBalance(
        event.params.trader,
        event.params.collateralToken,
    )
    traderNonSettlementTokenBalance.amount = traderNonSettlementTokenBalance.amount.minus(liquidatedAmount)

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    protocol.totalSettlementTokenBalance = protocol.totalSettlementTokenBalance
        .plus(repaidSettlementWithoutInsuranceFundFee)
        .plus(insuranceFundFee)

    const protocolNonSettlementTokenBalance = getOrCreateProtocolTokenBalance(event.params.collateralToken)
    protocolNonSettlementTokenBalance.amount = protocolNonSettlementTokenBalance.amount.minus(liquidatedAmount)

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "CollateralLiquidated"

    collateralLiquidated.save()
    trader.save()
    traderNonSettlementTokenBalance.save()
    protocol.save()
    protocolEventInfo.save()
    protocolNonSettlementTokenBalance.save()
}

export function handleBadDebtSettled(event: BadDebtSettledEvent): void {
    const badDebtAmount = fromWei(event.params.amount, VAULT_DECIMALS)

    // insert BadDebtSettled
    const badDebtSettled = new BadDebtSettled(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    badDebtSettled.trader = event.params.trader
    badDebtSettled.amount = badDebtAmount
    badDebtSettled.caller = event.transaction.from
    badDebtSettled.blockNumberLogIndex = getBlockNumberLogIndex(event)
    badDebtSettled.blockNumber = event.block.number
    badDebtSettled.timestamp = event.block.timestamp

    // upsert Trader
    const trader = Trader.load(formatTraderId(event.params.trader)) as Trader
    trader.blockNumber = event.block.number
    trader.timestamp = event.block.timestamp

    // upsert Protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // protocol.totalSettledBadDebt could be null due to backward compatibility
    if (protocol.totalSettledBadDebt !== null) {
        protocol.totalSettledBadDebt = protocol.totalSettledBadDebt!.plus(badDebtAmount)
    } else {
        protocol.totalSettledBadDebt = badDebtAmount
    }

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "BadDebtSettled"

    // commit changes
    badDebtSettled.save()
    trader.save()
    protocol.save()
    protocolEventInfo.save()
}
