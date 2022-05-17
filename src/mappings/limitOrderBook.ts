import { LimitOrderFilled as LimitOrderFilledEvent, LimitOrderCancelled as LimitOrderCancelledEvent } from "../../generated/LimitOrderBook/LimitOrderBook"
import { LimitOrderFilled, LimitOrderCancelled } from "../../generated/schema"
import { fromWei } from "../utils/numbers"
import { getBlockNumberLogIndex, getOrCreateProtocol } from "../utils/stores"

export function handleLimitOrderFilled(event: LimitOrderFilledEvent): void {
    // insert LimitOrderFilled
    const limitOrderFilled = new LimitOrderFilled(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    limitOrderFilled.blockNumberLogIndex = getBlockNumberLogIndex(event)
    limitOrderFilled.blockNumber = event.block.number
    limitOrderFilled.timestamp = event.block.timestamp
    limitOrderFilled.txHash = event.transaction.hash
    limitOrderFilled.trader = event.params.trader
    limitOrderFilled.baseToken = event.params.baseToken
    limitOrderFilled.orderHash = event.params.orderHash
    limitOrderFilled.keeper = event.params.keeper
    limitOrderFilled.keeperReward = fromWei(event.params.keeperReward)

    // upsert protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // commit changes
    limitOrderFilled.save()
    protocol.save()
}

export function handleLimitOrderCancelled(event: LimitOrderCancelledEvent): void {
    // insert LimitOrderCancelled
    const limitOrderCancelled = new LimitOrderCancelled(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    limitOrderCancelled.blockNumberLogIndex = getBlockNumberLogIndex(event)
    limitOrderCancelled.blockNumber = event.block.number
    limitOrderCancelled.timestamp = event.block.timestamp
    limitOrderCancelled.txHash = event.transaction.hash
    limitOrderCancelled.trader = event.params.trader
    limitOrderCancelled.baseToken = event.params.baseToken
    limitOrderCancelled.orderHash = event.params.orderHash

    // upsert protocol
    const protocol = getOrCreateProtocol()
    protocol.blockNumber = event.block.number
    protocol.timestamp = event.block.timestamp

    // commit changes
    limitOrderCancelled.save()
    protocol.save()
}
