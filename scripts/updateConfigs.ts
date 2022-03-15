import DependenciesOptimismKovanDev1 from "@perp/curie-deployments/optimism-kovan-dev1/core/dependencies.json"
import MetadataOptimismKovanDev1 from "@perp/curie-deployments/optimism-kovan-dev1/core/metadata.json"
import DependenciesOptimismKovanDev2 from "@perp/curie-deployments/optimism-kovan-dev2/core/dependencies.json"
import MetadataOptimismKovanDev2 from "@perp/curie-deployments/optimism-kovan-dev2/core/metadata.json"
import DependenciesOptimismKovan from "@perp/curie-deployments/optimism-kovan/core/dependencies.json"
import MetadataOptimismKovan from "@perp/curie-deployments/optimism-kovan/core/metadata.json"
import DependenciesOptimism from "@perp/curie-deployments/optimism/core/dependencies.json"
import MetadataOptimism from "@perp/curie-deployments/optimism/core/metadata.json"
import fs from "fs"

async function main(): Promise<void> {
    const stages = [
        {
            name: "optimismKovanDev1",
            network: "optimism-kovan",
            metadata: MetadataOptimismKovanDev1,
            version: DependenciesOptimismKovanDev1["@perp/curie-contract"],
        },
        {
            name: "optimismKovanDev2",
            network: "optimism-kovan",
            metadata: MetadataOptimismKovanDev2,
            version: DependenciesOptimismKovanDev2["@perp/curie-contract"],
        },
        {
            name: "optimismKovan",
            network: "optimism-kovan",
            metadata: MetadataOptimismKovan,
            version: DependenciesOptimismKovan["@perp/curie-contract"],
        },
        {
            name: "optimism",
            network: "optimism",
            metadata: {
                ...MetadataOptimism,
                referralContracts: {
                    PerpetualProtocolReferrer: "0xbfBa3368d94b8b006A4fd59C13b9e9F9b071D106",
                },
            },
            version: DependenciesOptimism["@perp/curie-contract"],
        },
    ]

    for (const stage of stages) {
        const config = {
            ...stage.metadata,
            ...{
                network: stage.network, // subgraph uses lower case and dash
                version: stage.version,
            },
        }
        const configJson = JSON.stringify(config, null, 4)
        await fs.promises.writeFile(`configs/${stage.name}.json`, configJson, "utf8")
    }
}

if (require.main === module) {
    main()
}
