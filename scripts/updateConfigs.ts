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
            // NOTE: subgraph id exists in The Graph might not exist in Satsuma,
            // so we might need to set different graft.base
            // disable graft if you need to do a full re-index
            // To fetch the subgraph IDs:
            //     curl --location 'https://your/healthcheck/endpoint' \
            //         --header 'Content-Type: application/json' \
            //         --header 'Accept: application/json' \
            //         --data '{"query":"{\n  indexingStatusForCurrentVersion(subgraphName: \"perpetual-protocol/perpetual-v2-optimism\") {\n    subgraph\n  }\n}","variables":{}}'
            //
            // Healthcheck endpoints for each deployment target can be found in the README.
            // For Satsuma-based subgraph, log in to https://app.satsuma.xyz/
            //   -> choose target subgraph
            //   -> find "Deployment ID"
            // graft: {
            //     base: "QmW6xjaqSA37ZxsQ9WLp5fqReHpgXrridcWrk4DcpMqGa2",
            //     baseForSatsuma: "QmW6xjaqSA37ZxsQ9WLp5fqReHpgXrridcWrk4DcpMqGa2",
            //     // The block number to restore and start re-syncing from.
            //     block: 53189383,
            // },
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
