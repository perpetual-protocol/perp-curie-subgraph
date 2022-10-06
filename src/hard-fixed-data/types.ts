import { BigDecimal, TypedMap } from "@graphprotocol/graph-ts"

// { takerPositionSize, openNotional }
export type DataMap = TypedMap<string, BigDecimal>
// baseToken => { takerPositionSize, openNotional }
export type BaseTokenMap = TypedMap<string, DataMap>
// txHash => baseTokenMap
export type HardFixedDataMap = TypedMap<string, BaseTokenMap>
