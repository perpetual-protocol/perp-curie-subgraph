import { BigDecimal } from "@graphprotocol/graph-ts"
import { BD_ZERO } from "./numbers"

export function getBadDebt(collateral: BigDecimal): BigDecimal {
    return collateral.lt(BD_ZERO) ? collateral.neg() : BD_ZERO
}
