import {
    OnReferralCodeCreated,
    OnReferralCodeUpserted,
    OnUncappedPartnerAssigned,
    OnUncappedPartnerRemoved,
} from "../../generated/Referrer/Referrer"
import { BI_ONE } from "../utils/numbers"
import { createReferralCode, getOrCreateTrader, getReferralCode, getReferralCodeDayData } from "../utils/stores"

export function handleReferralCodeCreated(event: OnReferralCodeCreated): void {
    let trader = getOrCreateTrader(event.params.createdFor)

    // createdFor represents the referrer
    createReferralCode(event.params.referralCode, event.params.createdFor, event.params.timestamp)
    trader.referrerCode = event.params.referralCode
    trader.save()
}

export function handleReferralCodeUpserted(event: OnReferralCodeUpserted): void {
    let existingReferralCode = getReferralCode(event.params.oldReferralCode)
    let trader = getOrCreateTrader(event.params.addr)
    // Only proceed any action, if the referee has a code attached
    if (existingReferralCode) {
        // Referee removes code
        if (event.params.action == 1) {
            // trader no longer has a referee code
            trader.refereeCode = null
            trader.save()

            // update referee count for code
            existingReferralCode.numReferees = existingReferralCode.numReferees.minus(BI_ONE)
            existingReferralCode.save()
            return
        }

        // add and update should only be possible if newReferralCode contains a value
        if (event.params.newReferralCode != "") {
            let newReferralCode = getReferralCode(event.params.newReferralCode)
            let newReferralCodeDayData = getReferralCodeDayData(event, newReferralCode.id)
            if (event.params.action == 2) {
                // nothing changes here
                if (event.params.oldReferralCode == event.params.newReferralCode) return
            }

            // uptick new referee daydata when an update or new referee is added
            let newReferralReferees = newReferralCodeDayData.newReferees
            newReferralReferees.push(event.params.addr.toHexString())
            newReferralCodeDayData.newReferees = newReferralReferees
            newReferralCodeDayData.save()

            // update the referee code for the trader (sender)
            trader.refereeCode = newReferralCode.id
            trader.save()

            // update referee count for old code, if it exists
            if (existingReferralCode) {
                existingReferralCode.numReferees = existingReferralCode.numReferees.minus(BI_ONE)
                existingReferralCode.save()
            }

            // update referee count for new code
            newReferralCode.numReferees = newReferralCode.numReferees.plus(BI_ONE)
            newReferralCode.save()
        }
    }
}

export function handleUncappedPartnerUpserted(event: OnUncappedPartnerAssigned): void {
    let trader = getOrCreateTrader(event.params.addr)
    let referrerCode = trader.referrerCode
    // confirm that the partner indeed has a referrer code
    if (referrerCode) {
        let referralCode = getReferralCode(referrerCode)
        if (referralCode != null) {
            referralCode.vipTier = event.params.tier
            if (!referralCode.vipSince) {
                referralCode.vipSince = event.block.timestamp
            }
            referralCode.save()
        }
    }
}

export function handleUncappedPartnerRemoved(event: OnUncappedPartnerRemoved): void {
    let trader = getOrCreateTrader(event.params.addr)
    let referrerCode = trader.referrerCode

    // confirm that the partner indeed has a referrer code
    if (referrerCode) {
        let referralCode = getReferralCode(referrerCode)
        if (referralCode != null) {
            referralCode.vipTier = null
            referralCode.vipSince = null
            referralCode.save()
        }
    }
}
