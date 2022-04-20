import { BigDecimal } from "@graphprotocol/graph-ts"

// { takerPositionSize, openNotional }
export type DataMap = Map<string, BigDecimal>
// baseToken => { takerPositionSize, openNotional }
export type BaseTokenMap = Map<string, DataMap>
// txHash => baseTokenMap
export type HardFixedDataMap = Map<string, BaseTokenMap>
