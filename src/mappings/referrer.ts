import { OnReferralCodeCreated, OnReferralCodeUpserted } from "../../generated/Referrer/Referrer"
import { createReferralCode, getOrCreateProtocolEventInfo, getOrCreateTrader, getReferralCode } from "../utils/stores"

import { BigInt } from "@graphprotocol/graph-ts"
import { ReferralCode } from "../../generated/schema"
import { BI_ONE } from "../utils/numbers"

export function handleReferralCodeCreated(event: OnReferralCodeCreated): void {
    // createdFor represents the referrer
    createReferralCode(event.params.referralCode, event.params.createdFor, event.params.timestamp)

    // upsert Trader
    const trader = getOrCreateTrader(event.params.createdFor)
    trader.referrerCode = event.params.referralCode

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "OnReferralCodeCreated"

    // commit changes
    trader.save()
    protocolEventInfo.save()
}

export function handleReferralCodeUpserted(event: OnReferralCodeUpserted): void {
    // according to the contract code https://github.com/perpetual-protocol/perp-referral-contracts/blob/95e28123d65974da1b2fdad154e54761b21b50dc/contracts/PerpetualProtocolReferrer.sol#L74
    // event.params.oldReferralCode is non-empty

    const ACTION_ADD = 0
    const ACTION_REMOVE = 1
    const ACTION_UPDATE = 2

    switch (event.params.action) {
        case ACTION_ADD:
            handleRefCodeAdd(event)
            break
        case ACTION_REMOVE:
            handleRefCodeRemove(event)
            break
        case ACTION_UPDATE:
            handleRefCodeUpdate(event)
            break
    }

    // upsert ProtocolEventInfo
    const protocolEventInfo = getOrCreateProtocolEventInfo()
    protocolEventInfo.totalEventCount = protocolEventInfo.totalEventCount.plus(BigInt.fromI32(1))
    protocolEventInfo.lastProcessedEventName = "OnReferralCodeUpserted"

    // commit changes
    protocolEventInfo.save()
}

function handleRefCodeAdd(event: OnReferralCodeUpserted): void {
    if (!event.params.newReferralCode) {
        return
    }

    const newRefCode = getReferralCode(event.params.newReferralCode)
    if (!newRefCode) {
        return
    }

    updateNewRefCode(newRefCode, event)
}

function handleRefCodeRemove(event: OnReferralCodeUpserted): void {
    const oldRefCode = getReferralCode(event.params.oldReferralCode)
    if (!oldRefCode) {
        return
    }

    oldRefCode.numReferees = oldRefCode.numReferees.minus(BI_ONE)
    oldRefCode.save()

    const trader = getOrCreateTrader(event.params.addr)
    trader.refereeCode = null
    trader.save()
}

function handleRefCodeUpdate(event: OnReferralCodeUpserted): void {
    if (!event.params.newReferralCode || event.params.newReferralCode == event.params.oldReferralCode) {
        return
    }

    const oldRefCode = getReferralCode(event.params.oldReferralCode)
    if (!oldRefCode) {
        return
    }

    const newRefCode = getReferralCode(event.params.newReferralCode)
    if (!newRefCode) {
        return
    }

    oldRefCode.numReferees = oldRefCode.numReferees.minus(BI_ONE)
    oldRefCode.save()

    updateNewRefCode(newRefCode, event)
}

function updateNewRefCode(newRefCode: ReferralCode, event: OnReferralCodeUpserted): void {
    newRefCode.numReferees = newRefCode.numReferees.plus(BI_ONE)
    newRefCode.save()

    const trader = getOrCreateTrader(event.params.addr)
    trader.refereeCode = newRefCode.id
    trader.save()
}
