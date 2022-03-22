import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ERC20 } from "../../generated/CollateralManager/ERC20"

export function fetchTokenSymbol(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress)
    const symbolResult = contract.try_symbol()
    return symbolResult.value != "" ? symbolResult.value : "unknown"
}

export function fetchTokenName(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress)
    const nameResult = contract.try_name()
    return nameResult.value != "" ? nameResult.value : "unknown"
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress)
    // try types uint8 for decimals
    let decimalResult = contract.try_decimals()
    return BigInt.fromI32(decimalResult.value as i32)
}
