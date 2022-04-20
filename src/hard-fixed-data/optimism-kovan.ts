import { BigDecimal } from "@graphprotocol/graph-ts"
import { BaseTokenMap, DataMap } from "./types"

export const hardFixedDataMap = new Map<string, BaseTokenMap>()
let dataMap: Map<string, BigDecimal>
let baseTokenMap: Map<string, DataMap>

// replace below code from GraphIncorrectDataAnalyzer.ts
// trader: 0xee79755c99bb51ee4bfd8f490a873ac0102cc903
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.001040475709292959"))
dataMap.set("openNotional", BigDecimal.fromString("-43.9440515766384918"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1f91666a0706ef6e8e1506e3889171940c94b51a", dataMap)
hardFixedDataMap.set("0x31f270b71cb3536253325ed99b18912211dbf628d8c9c01d5766ef6907df3692", baseTokenMap)

// trader: 0x39da7b77afec19701cce9e0c3b9e56e6a497d95b
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.00470431243697727"))
dataMap.set("openNotional", BigDecimal.fromString("-201.878638398972540562"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1f91666a0706ef6e8e1506e3889171940c94b51a", dataMap)
hardFixedDataMap.set("0x171006485cdbb05298aa6aecf294c303742ae6aefcfe9f376dc23cd8c3c1253b", baseTokenMap)

// trader: 0x3be70936fcf9d3ecaad5fb41d24613d33efe3d2a
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.214502028329529465"))
dataMap.set("openNotional", BigDecimal.fromString("-52386.405708806865571713"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1f91666a0706ef6e8e1506e3889171940c94b51a", dataMap)
hardFixedDataMap.set("0x0c5622458189160e3038f817be691f7ba058c313d406e4d31390383c3b42be61", baseTokenMap)

// trader: 0x40f1c479cb6f98095965d35c5c6c39f92a685e77
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("28.555888682640782666"))
dataMap.set("openNotional", BigDecimal.fromString("-88400.021068653084300473"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x5802918dc503c465f969da0847b71e3fbe9b141c", dataMap)
hardFixedDataMap.set("0x80881de08bb871d87cd7f7a584e9380585bc35f8cf0195182bee651c58269f6a", baseTokenMap)

// trader: 0x969a524dc7e46f0def44352c11b2296d37ef6e23
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.759629056177582733"))
dataMap.set("openNotional", BigDecimal.fromString("-2628.667254323171570509"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x5802918dc503c465f969da0847b71e3fbe9b141c", dataMap)
hardFixedDataMap.set("0x872dc7c49ed5015c73dfacdbea5042fdf2e3038134305bc87f86aa8337384034", baseTokenMap)

// trader: 0xefc0d892656eeb59a0b54a6b4f2a0d2fad4b66c8
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("1.080316286386195571"))
dataMap.set("openNotional", BigDecimal.fromString("-46684.147474986929864029"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1f91666a0706ef6e8e1506e3889171940c94b51a", dataMap)
hardFixedDataMap.set("0xe63574e956ef5d69398e8ef55e479862e1cfb7eb63c911acc659435acaceeca2", baseTokenMap)

// trader: 0xefc0d892656eeb59a0b54a6b4f2a0d2fad4b66c8
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("6.367838149488059321"))
dataMap.set("openNotional", BigDecimal.fromString("-19999.999997609876932547"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x5802918dc503c465f969da0847b71e3fbe9b141c", dataMap)
hardFixedDataMap.set("0x436265e962fbd2edf301602555b26f573e95e7b855e03f4dfdb80fd27fed875a", baseTokenMap)

// trader: 0xc964bfea34ff229a11d4e88e93e32c1ae379a5ce
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("6.436370204012440711"))
dataMap.set("openNotional", BigDecimal.fromString("-499.999999993175804537"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1dbc57cf0e38f3ab2e31dae6c32829eacde6fd3a", dataMap)
hardFixedDataMap.set("0x4bfa78edc832f14316ebe14144cc476063ebbd52a5b7333254e3745979ab1a51", baseTokenMap)

// trader: 0xc964bfea34ff229a11d4e88e93e32c1ae379a5ce
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.293659231700843518"))
dataMap.set("openNotional", BigDecimal.fromString("-11217.092800944845807676"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1f91666a0706ef6e8e1506e3889171940c94b51a", dataMap)
hardFixedDataMap.set("0x1c4a202d7906b3b8ba18493c131ab3d0c04c899e9d599735abdc6526be556278", baseTokenMap)

// trader: 0xa1be19349c296c4c7125894672ebc1756493617a
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("12.794984749084918966"))
dataMap.set("openNotional", BigDecimal.fromString("-36568.454610364678355496"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x5802918dc503c465f969da0847b71e3fbe9b141c", dataMap)
hardFixedDataMap.set("0x944296268079638e46f7d96cdf8e8a2a07fb520060fbea1a1ade0a040406f968", baseTokenMap)

// trader: 0xb0acd902b50d7dbe7cba11af3bd3cc0794366150
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("106.821781805364556231"))
dataMap.set("openNotional", BigDecimal.fromString("-7057.487701361041937508"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x798310f8dd81e9f0117a66a8615ad769b3f801ae", dataMap)
hardFixedDataMap.set("0xcb36311dd554ececea7079a689d3e8c4a5071fe9b2a47c7ebad13670692134c3", baseTokenMap)

// trader: 0xefc0d892656eeb59a0b54a6b4f2a0d2fad4b66c8
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("0.168536612290667681"))
dataMap.set("openNotional", BigDecimal.fromString("-6266.177488542408054133"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1f91666a0706ef6e8e1506e3889171940c94b51a", dataMap)
hardFixedDataMap.set("0xbb9dae6eef390a5668348e1e134493c010d7afb1fb513f09ba7ecf033cafa032", baseTokenMap)

// trader: 0x4ae93782728e787be7104af2cbdf5f64530bc088
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("-13.915763036179143625"))
dataMap.set("openNotional", BigDecimal.fromString("954.414641021084838064"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x1dbc57cf0e38f3ab2e31dae6c32829eacde6fd3a", dataMap)
hardFixedDataMap.set("0xf99b27ea46e19e46d45c91d9a5d00b6411ffdbbd245772cc357a2e9cfede4fe1", baseTokenMap)

// trader: 0x4ae93782728e787be7104af2cbdf5f64530bc088
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("-0.543790683317458003"))
dataMap.set("openNotional", BigDecimal.fromString("1458.442386682630196784"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0x5802918dc503c465f969da0847b71e3fbe9b141c", dataMap)
hardFixedDataMap.set("0x50732ff4d0b3a1a3d8515186eab7c290ee1df97193ba100d78e026bb7df43de4", baseTokenMap)

// trader: 0x4ae93782728e787be7104af2cbdf5f64530bc088
dataMap = new Map<string, BigDecimal>()
dataMap.set("takerPositionSize", BigDecimal.fromString("-4.21039925604513218"))
dataMap.set("openNotional", BigDecimal.fromString("445.680621076288426623"))
baseTokenMap = new Map<string, DataMap>()
baseTokenMap.set("0xb9c4be24a7017990df526a7f179de7f30e1c0c87", dataMap)
hardFixedDataMap.set("0x2cd280a8d6925bb3597ed8268a3d633b9dee80a128bbc0147c8c74201f75511e", baseTokenMap)
