import { Address, BigInt } from "@graphprotocol/graph-ts"

// TODO: will it be easier if we create a GraphQL table to store these data?
type StrStrMap = Map<string, string>

const wethMap = new Map<string, string>()
wethMap.set("id", "0x4200000000000000000000000000000000000006")
wethMap.set("name", "Wrapped Ether")
wethMap.set("symbol", "WETH")
wethMap.set("decimals", "18")

const usdcMap = new Map<string, string>()
usdcMap.set("id", "0x7f5c764cbc14f9669b88837ca1490cca17c31607")
usdcMap.set("name", "USD Coin")
usdcMap.set("symbol", "USDC")
usdcMap.set("decimals", "6")

const fraxMap = new Map<string, string>()
fraxMap.set("id", "0x2e3d870790dc77a83dd1d18184acc7439a53f475")
fraxMap.set("name", "Frax")
fraxMap.set("symbol", "FRAX")
fraxMap.set("decimals", "18")

const collateralMap = new Map<string, StrStrMap>()
collateralMap.set("0x4200000000000000000000000000000000000006", wethMap)
collateralMap.set("0x7f5c764cbc14f9669b88837ca1490cca17c31607", usdcMap)
collateralMap.set("0x2e3d870790dc77a83dd1d18184acc7439a53f475", fraxMap)

function isNullEthValue(value: string): boolean {
    return value == "0x0000000000000000000000000000000000000000000000000000000000000001"
}

export function fetchTokenSymbol(tokenAddress: Address): string {
    const erc20 = collateralMap.get(tokenAddress.toHexString())
    if (!erc20) {
        return "unknown"
    }
    return erc20.get("symbol")
}

export function fetchTokenName(tokenAddress: Address): string {
    const erc20 = collateralMap.get(tokenAddress.toHexString())
    if (!erc20) {
        return "unknown"
    }
    return erc20.get("name")
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    const erc20 = collateralMap.get(tokenAddress.toHexString())
    if (!erc20) {
        return BigInt.fromString("18")
    }
    return BigInt.fromString(erc20.get("decimals"))
}
