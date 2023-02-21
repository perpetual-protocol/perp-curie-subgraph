import DependenciesOptimismGoerli from "@perp/curie-deployments/optimism-goerli/core/dependencies.json"
import MetadataOptimismGoerli from "@perp/curie-deployments/optimism-goerli/core/metadata.json"
import DependenciesOptimism from "@perp/curie-deployments/optimism/core/dependencies.json"
import MetadataOptimism from "@perp/curie-deployments/optimism/core/metadata.json"

import DependenciesOptimismGoerliPeriphery from "@perp/curie-deployments/optimism-goerli/periphery/dependencies.json"
import MetadataOptimismGoerliPeriphery from "@perp/curie-deployments/optimism-goerli/periphery/metadata.json"
import DependenciesOptimismPeriphery from "@perp/curie-deployments/optimism/periphery/dependencies.json"
import MetadataOptimismPeriphery from "@perp/curie-deployments/optimism/periphery/metadata.json"

import fs from "fs"

async function main(): Promise<void> {
    const configs = [
        {
            name: "optimismGoerli",
            network: "optimism-goerli",
            core: {
                ...MetadataOptimismGoerli,
                ...{ version: DependenciesOptimismGoerli["@perp/curie-contract"] },
            },
            periphery: {
                ...MetadataOptimismGoerliPeriphery,
                ...{ version: DependenciesOptimismGoerliPeriphery["@perp/curie-periphery-contract"] },
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
            // // NOTE: subgraph id exists in The Graph might not exist in self-hosted graph node,
            // // so we might need to set different graft.base
            graft: {
                base: "QmdDjf1BQb27EafqcW78GGKKXaKHK6rXyD9at5uQxaQj3o",
                baseForSelfHosted: "QmdDjf1BQb27EafqcW78GGKKXaKHK6rXyD9at5uQxaQj3o",
                block: 75682240,
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
