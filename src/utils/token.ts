import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ERC20 } from "../../generated/CollateralManager/ERC20"
import { ERC20NameBytes } from "../../generated/CollateralManager/ERC20NameBytes"
import { ERC20SymbolBytes } from "../../generated/CollateralManager/ERC20SymbolBytes"

function isNullEthValue(value: string): boolean {
    return value == "0x0000000000000000000000000000000000000000000000000000000000000001"
}

export function fetchTokenSymbol(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress)
    let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress)

    // try types string and bytes32 for symbol
    let symbolValue = "unknown"
    let symbolResult = contract.try_symbol()
    if (symbolResult.reverted) {
        let symbolResultBytes = contractSymbolBytes.try_symbol()
        if (!symbolResultBytes.reverted) {
            // for broken tokens that have no symbol function exposed
            if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
                symbolValue = symbolResultBytes.value.toString()
            }
        }
    } else {
        symbolValue = symbolResult.value
    }

    return symbolValue
}

export function fetchTokenName(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress)
    let contractNameBytes = ERC20NameBytes.bind(tokenAddress)

    // try types string and bytes32 for name
    let nameValue = "unknown"
    let nameResult = contract.try_name()
    if (nameResult.reverted) {
        let nameResultBytes = contractNameBytes.try_name()
        if (!nameResultBytes.reverted) {
            // for broken tokens that have no name function exposed
            if (!isNullEthValue(nameResultBytes.value.toHexString())) {
                nameValue = nameResultBytes.value.toString()
            }
        }
    } else {
        nameValue = nameResult.value
    }

    return nameValue
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress)
    let totalSupplyValue = null
    let totalSupplyResult = contract.try_totalSupply()
    if (!totalSupplyResult.reverted) {
        totalSupplyValue = totalSupplyResult as i32
    }
    return BigInt.fromI32(totalSupplyValue as i32)
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress)
    // try types uint8 for decimals
    let decimalValue = null
    let decimalResult = contract.try_decimals()
    if (!decimalResult.reverted) {
        decimalValue = decimalResult.value
    }

    return BigInt.fromI32(decimalValue as i32)
}
