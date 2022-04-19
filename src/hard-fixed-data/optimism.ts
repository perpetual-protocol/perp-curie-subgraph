import { BigDecimal } from "@graphprotocol/graph-ts"
import { BaseTokenMap, DataMap } from "./types"

export const hardFixedDataMap = new Map<string, BaseTokenMap>()
let dataMap: Map<string, BigDecimal>
let baseTokenMap: Map<string, DataMap>

// replace below code from GraphIncorrectDataAnalyzer.ts
