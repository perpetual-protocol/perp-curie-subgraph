import {
    LimitOrderCancelled as LimitOrderCancelledEvent,
    LimitOrderFilled as LimitOrderFilledEvent,
} from "../../generated/LimitOrderBook/LimitOrderBook"
import { LimitOrderCancelled, LimitOrderFilled } from "../../generated/schema"
import { abs, fromWei } from "../utils/numbers"
import { getBlockNumberLogIndex } from "../utils/stores"

export function handleLimitOrderFilled(event: LimitOrderFilledEvent): void {
    // insert LimitOrderFilled
    const limitOrderFilled = new LimitOrderFilled(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    limitOrderFilled.blockNumberLogIndex = getBlockNumberLogIndex(event)
    limitOrderFilled.blockNumber = event.block.number
    limitOrderFilled.timestamp = event.block.timestamp
    limitOrderFilled.txHash = event.transaction.hash
    limitOrderFilled.trader = event.params.trader
    limitOrderFilled.baseToken = event.params.baseToken
    limitOrderFilled.orderHash = event.params.orderHash
    limitOrderFilled.keeper = event.params.keeper
    limitOrderFilled.keeperReward = fromWei(event.params.keeperReward)
    limitOrderFilled.exchangedPositionSize = fromWei(event.params.exchangedPositionSize)
    limitOrderFilled.exchangedPositionNotional = fromWei(event.params.exchangedPositionNotional)
    limitOrderFilled.fee = fromWei(event.params.fee)
    limitOrderFilled.filledPrice = abs(
        limitOrderFilled.exchangedPositionNotional.div(limitOrderFilled.exchangedPositionSize),
    )

    // commit changes
    limitOrderFilled.save()
}

export function handleLimitOrderCancelled(event: LimitOrderCancelledEvent): void {
    // insert LimitOrderCancelled
    const limitOrderCancelled = new LimitOrderCancelled(
        `${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`,
    )
    limitOrderCancelled.blockNumberLogIndex = getBlockNumberLogIndex(event)
    limitOrderCancelled.blockNumber = event.block.number
    limitOrderCancelled.timestamp = event.block.timestamp
    limitOrderCancelled.txHash = event.transaction.hash
    limitOrderCancelled.trader = event.params.trader
    limitOrderCancelled.baseToken = event.params.baseToken
    limitOrderCancelled.orderHash = event.params.orderHash
    limitOrderCancelled.positionSize = fromWei(event.params.positionSize)
    limitOrderCancelled.positionNotional = fromWei(event.params.positionNotional)
    limitOrderCancelled.limitPrice = abs(limitOrderCancelled.positionNotional.div(limitOrderCancelled.positionSize))

    // commit changes
    limitOrderCancelled.save()
}
