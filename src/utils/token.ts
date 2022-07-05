import { Address, BigInt } from "@graphprotocol/graph-ts"
import { collateralMap } from "../constants"

export function fetchTokenSymbol(tokenAddress: Address): string {
    const erc20 = collateralMap.get(tokenAddress)
    if (!erc20) {
        return "unknown"
    }
    return erc20.get("symbol")!
}

export function fetchTokenName(tokenAddress: Address): string {
    const erc20 = collateralMap.get(tokenAddress)
    if (!erc20) {
        return "unknown"
    }
    return erc20.get("name")!
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    const erc20 = collateralMap.get(tokenAddress)
    if (!erc20) {
        return BigInt.fromString("18")
    }
    return BigInt.fromString(erc20.get("decimals")!)
}
