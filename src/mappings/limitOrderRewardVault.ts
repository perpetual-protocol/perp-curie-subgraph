import { Disbursed as DisbursedEvent } from "../../generated/LimitOrderRewardVault/LimitOrderRewardVault"
import { LimitOrderFilled } from "../../generated/schema"
import { fromWei } from "../utils/numbers"

export function handleDisbursed(event: DisbursedEvent): void {
    // insert LimitOrderFilled
    const limitOrderFilled = new LimitOrderFilled(`${event.params.orderHash.toHexString()}}`)
    limitOrderFilled.keeper = event.params.keeper
    limitOrderFilled.rewardToken = event.params.token
    limitOrderFilled.rewardAmount = fromWei(event.params.amount)

    // commit changes
    limitOrderFilled.save()
}
