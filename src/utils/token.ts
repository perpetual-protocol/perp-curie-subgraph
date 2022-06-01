import { Address, BigInt } from "@graphprotocol/graph-ts"

interface Erc20 {
    id: string
    name: string
    symbol: string
    decimals: string
}

const collateralMap: { [id: string]: Erc20 } = {
    "0x4200000000000000000000000000000000000006":
        {
            "id": "0x4200000000000000000000000000000000000006",
            "name": "Wrapped Ether",
            "symbol": "WETH",
            "decimals": "18",
        },
    "0x7f5c764cbc14f9669b88837ca1490cca17c31607":
        {
            "id": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
            "name": "USD Coin",
            "symbol": "USDC",
            "decimals": "6",
        },
    "0x2e3d870790dc77a83dd1d18184acc7439a53f475":
        {
            "id": "0x2e3d870790dc77a83dd1d18184acc7439a53f475",
            "name": "Frax",
            "symbol": "FRAX",
            "decimals": "18",
        },
}

function isNullEthValue(value: string): boolean {
    return value == "0x0000000000000000000000000000000000000000000000000000000000000001"
}

export function fetchTokenSymbol(tokenAddress: Address): string {
    const erc20 = collateralMap[tokenAddress.toHexString()]
    if (!erc20) {
        return "unknown"
    }
    return erc20.symbol
}

export function fetchTokenName(tokenAddress: Address): string {
    const erc20 = collateralMap[tokenAddress.toHexString()]
    if (!erc20) {
        return "unknown"
    }
    return erc20.name
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    const erc20 = collateralMap[tokenAddress.toHexString()]
    if (!erc20) {
        return BigInt.fromString("18")
    }
    return BigInt.fromString(erc20.decimals)
}
