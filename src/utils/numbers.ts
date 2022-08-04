import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"

export const BI_ZERO = BigInt.fromI32(0)
export const BI_ONE = BigInt.fromI32(1)
export const BD_ZERO = BigDecimal.fromString("0.0")
export const DUST_POSITION_SIZE = fromWei(BigInt.fromI32(10))
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
export const VAULT_DECIMALS = BigInt.fromI32(6)
export const DEFAULT_DECIMALS = BigInt.fromI32(18)
export const RATIO_ONE = BigDecimal.fromString("1000000")

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString("1")
    for (let i = BI_ZERO; i.lt(decimals as BigInt); i = i.plus(BI_ONE)) {
        bd = bd.times(BigDecimal.fromString("10"))
    }
    return bd
}

export function fromWei(value: BigInt, decimals: BigInt = DEFAULT_DECIMALS): BigDecimal {
    return value.toBigDecimal().div(exponentToBigDecimal(decimals))
}

export function abs(value: BigDecimal): BigDecimal {
    return value.lt(BD_ZERO) ? value.neg() : value
}

export function powD(value: BigDecimal, n: BigInt): BigDecimal {
    let bd = value
    for (let i = BI_ONE; i.lt(n); i = i.plus(BI_ONE)) {
        bd = bd.times(value)
    }
    return bd
}

export function fromSqrtPriceX96(value: BigInt): BigDecimal {
    // sqrtPriceX96.div(2 ** 96).pow(2)
    const sqrtPriceX96 = new BigDecimal(value)
    const Q96 = new BigDecimal(BigInt.fromI32(2).pow(96))
    return powD(sqrtPriceX96.div(Q96), BigInt.fromI32(2))
}
