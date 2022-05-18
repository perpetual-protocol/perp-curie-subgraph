import {
    OnReferralCodeCreated,
    OnReferralCodeUpserted,
    OnUncappedPartnerAssigned,
    OnUncappedPartnerRemoved,
} from "../../generated/Referrer/Referrer"
import { ReferralCode, Trader } from "../../generated/schema"
import { createReferralCode, getOrCreateTrader, getReferralCode, getReferralCodeDayData } from "../utils/stores"

import { BI_ONE } from "../utils/numbers"

export function handleReferralCodeCreated(event: OnReferralCodeCreated): void {
    let trader = getOrCreateTrader(event.params.createdFor)

    // createdFor represents the referrer
    createReferralCode(event.params.referralCode, event.params.createdFor, event.params.timestamp)
    trader.referrerCode = event.params.referralCode
    trader.save()
}

export function handleReferralCodeUpserted(event: OnReferralCodeUpserted): void {
    if (!event.params.oldReferralCode) {
        return
    }

    const oldRefCode = getReferralCode(event.params.oldReferralCode)
    if (!oldRefCode) {
        return
    }

    const ACTION_REMOVE_CODE = 1
    const ACTION_REPLACE_CODE = 2

    const trader = getOrCreateTrader(event.params.addr)

    switch (event.params.action) {
        case ACTION_REMOVE_CODE:
            removeReferralCodeFromReferee(trader, oldRefCode)
            break
        case ACTION_REPLACE_CODE:
            if (!event.params.newReferralCode || event.params.oldReferralCode == event.params.newReferralCode) {
                return
            }

            const newRefCode = getReferralCode(event.params.newReferralCode)
            if (!newRefCode) {
                return
            }

            replaceReferralCodeFromReferee(event, trader, oldRefCode, newRefCode)
            break
    }
}

function removeReferralCodeFromReferee(trader: Trader, refCode: ReferralCode): void {
    trader.refereeCode = null
    trader.save()

    refCode.numReferees = refCode.numReferees.minus(BI_ONE)
    refCode.save()
}

function replaceReferralCodeFromReferee(
    event: OnReferralCodeUpserted,
    trader: Trader,
    oldRefCode: ReferralCode,
    newRefCode: ReferralCode,
): void {
    trader.refereeCode = newRefCode.id
    trader.save()

    oldRefCode.numReferees = oldRefCode.numReferees.minus(BI_ONE)
    oldRefCode.save()

    newRefCode.numReferees = newRefCode.numReferees.plus(BI_ONE)
    newRefCode.save()

    const newRefCodeDayData = getReferralCodeDayData(event, newRefCode.id)
    newRefCodeDayData.newReferees.push(event.params.addr.toHexString())
    newRefCodeDayData.save()
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
