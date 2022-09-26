import DependenciesOptimismKovanDev1 from "@perp/curie-deployments/optimism-kovan-dev1/core/dependencies.json"
import MetadataOptimismKovanDev1 from "@perp/curie-deployments/optimism-kovan-dev1/core/metadata.json"
import DependenciesOptimismKovanDev2 from "@perp/curie-deployments/optimism-kovan-dev2/core/dependencies.json"
import MetadataOptimismKovanDev2 from "@perp/curie-deployments/optimism-kovan-dev2/core/metadata.json"
import DependenciesOptimismKovan from "@perp/curie-deployments/optimism-kovan/core/dependencies.json"
import MetadataOptimismKovan from "@perp/curie-deployments/optimism-kovan/core/metadata.json"
import DependenciesOptimism from "@perp/curie-deployments/optimism/core/dependencies.json"
import MetadataOptimism from "@perp/curie-deployments/optimism/core/metadata.json"

import DependenciesOptimismKovanDev1Periphery from "@perp/curie-deployments/optimism-kovan-dev1/periphery/dependencies.json"
import MetadataOptimismKovanDev1Periphery from "@perp/curie-deployments/optimism-kovan-dev1/periphery/metadata.json"
import DependenciesOptimismKovanDev2Periphery from "@perp/curie-deployments/optimism-kovan-dev2/periphery/dependencies.json"
import MetadataOptimismKovanDev2Periphery from "@perp/curie-deployments/optimism-kovan-dev2/periphery/metadata.json"
import DependenciesOptimismKovanPeriphery from "@perp/curie-deployments/optimism-kovan/periphery/dependencies.json"
import MetadataOptimismKovanPeriphery from "@perp/curie-deployments/optimism-kovan/periphery/metadata.json"
import DependenciesOptimismPeriphery from "@perp/curie-deployments/optimism/periphery/dependencies.json"
import MetadataOptimismPeriphery from "@perp/curie-deployments/optimism/periphery/metadata.json"

import fs from "fs"

async function main(): Promise<void> {
    const configs = [
        {
            name: "optimismKovanDev1",
            network: "optimism-kovan",
            core: {
                ...MetadataOptimismKovanDev1,
                ...{ version: DependenciesOptimismKovanDev1["@perp/curie-contract"] },
            },
            periphery: {
                ...MetadataOptimismKovanDev1Periphery,
                ...{ version: DependenciesOptimismKovanDev1Periphery["@perp/curie-periphery-contract"] },
            },
        },
        {
            name: "optimismKovanDev2",
            network: "optimism-kovan",
            core: {
                ...MetadataOptimismKovanDev2,
                ...{ version: DependenciesOptimismKovanDev2["@perp/curie-contract"] },
            },
            periphery: {
                ...MetadataOptimismKovanDev2Periphery,
                ...{ version: DependenciesOptimismKovanDev2Periphery["@perp/curie-periphery-contract"] },
            },
        },
        {
            name: "optimismKovan",
            network: "optimism-kovan",
            core: {
                ...MetadataOptimismKovan,
                ...{ version: DependenciesOptimismKovan["@perp/curie-contract"] },
            },
            periphery: {
                ...MetadataOptimismKovanPeriphery,
                ...{ version: DependenciesOptimismKovanPeriphery["@perp/curie-periphery-contract"] },
            },
            referral: {
                contracts: {
                    PerpetualProtocolReferrer: "0x5613A1522Ee8CFC38a036d51e8Dc7a5273301969",
                },
            },
        },
        {
            name: "optimism",
            network: "optimism",
            core: {
                ...MetadataOptimism,
                ...{ version: DependenciesOptimism["@perp/curie-contract"] },
            },
            periphery: {
                ...MetadataOptimismPeriphery,
                ...{ version: DependenciesOptimismPeriphery["@perp/curie-periphery-contract"] },
            },
            referral: {
                contracts: {
                    PerpetualProtocolReferrer: "0xbfBa3368d94b8b006A4fd59C13b9e9F9b071D106",
                },
            },
            graft: {
                base: "QmTzc1kxV7SZBbw2ApRRQbBndDzYGSyzMogDaMmt6bMJRo",
                block: 13868230, // DelegateApproval createdBlockNumber
            },
        },
    ]

    for (const config of configs) {
        const configJson = JSON.stringify(config, null, 4)
        await fs.promises.writeFile(`configs/${config.name}.json`, configJson, "utf8")
    }
}

if (require.main === module) {
    main()
}
