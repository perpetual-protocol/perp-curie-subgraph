import fs from "fs"

interface Artifact {
    abi: any
}

async function writeFile(abiName: string, artifact: Artifact) {
    const abiStr = JSON.stringify(artifact.abi, null, 2)
    await fs.promises.mkdir("abis", { recursive: true })
    await fs.promises.writeFile(`abis/${abiName}.json`, abiStr, "utf8")
}

async function main(): Promise<void> {
    const env = process.argv[2]

    // core
    const abiNames = [
        "AccountBalance",
        "ClearingHouse",
        "Exchange",
        "MarketRegistry",
        "OrderBook",
        "Vault",
        "CollateralManager",
        "DelegateApproval",
        "InsuranceFund",
    ]
    let artifact
    for (const abiName of abiNames) {
        try {
            artifact = await import(
                `@perp/curie-deployments/${env}/core/artifacts/contracts/${abiName}.sol/${abiName}.json`
            )
        } catch (error) {
            console.warn(`ABI of contract ${abiName} not found in ${env}`)
            continue
        }
        await writeFile(abiName, artifact)
    }

    // periphery
    const peripheryAbiNames = ["LimitOrderBook", "LimitOrderRewardVault"]
    for (const abiName of peripheryAbiNames) {
        try {
            artifact = await import(
                `@perp/curie-deployments/${env}/periphery/artifacts/contracts/limitOrder/${abiName}.sol/${abiName}.json`
            )
        } catch (error) {
            console.warn(`ABI of contract ${abiName} not found in ${env}`)
        }
        await writeFile(abiName, artifact)
    }
}

if (require.main === module) {
    main()
}
