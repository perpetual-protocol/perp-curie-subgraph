import { FundingUpdated as FundingUpdatedEvent } from "../../generated/Exchange/Exchange"
import { FundingUpdated } from "../../generated/schema"
import { fromWei } from "../utils/numbers"
import { getBlockNumberLogIndex } from "../utils/stores"

export function handleFundingUpdated(event: FundingUpdatedEvent): void {
    // insert FundingUpdated
    const fundingUpdated = new FundingUpdated(`${event.transaction.hash.toHexString()}-${event.logIndex.toString()}`)
    fundingUpdated.blockNumberLogIndex = getBlockNumberLogIndex(event)
    fundingUpdated.blockNumber = event.block.number
    fundingUpdated.timestamp = event.block.timestamp
    fundingUpdated.txHash = event.transaction.hash
    fundingUpdated.baseToken = event.params.baseToken
    fundingUpdated.markTwap = fromWei(event.params.markTwap)
    fundingUpdated.indexTwap = fromWei(event.params.indexTwap)
    // daily funding rate = (markTwap - indexTwap) / indexTwap
    fundingUpdated.dailyFundingRate = fundingUpdated.markTwap
        .minus(fundingUpdated.indexTwap)
        .div(fundingUpdated.indexTwap)

    // commit changes
    fundingUpdated.save()
}
