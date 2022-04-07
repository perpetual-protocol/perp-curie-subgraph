import fs from "fs"

async function main(): Promise<void> {
    const env = process.argv[2]
    const abiNames = [
        "AccountBalance",
        "ClearingHouse",
        "Exchange",
        "MarketRegistry",
        "OrderBook",
        "Vault",
        "CollateralManager",
    ]
    for (const abiName of abiNames) {
        let artifact
        try {
            artifact = await import(
                `@perp/curie-deployments/${env}/core/artifacts/contracts/${abiName}.sol/${abiName}.json`
            )
        } catch (error) {
            console.warn(`ABI of contract ${abiName} not found in ${env}`)
            continue
        }
        const abiStr = JSON.stringify(artifact.abi, null, 2)
        await fs.promises.mkdir("abis", { recursive: true })
        await fs.promises.writeFile(`abis/${abiName}.json`, abiStr, "utf8")
    }
}

if (require.main === module) {
    main()
}
