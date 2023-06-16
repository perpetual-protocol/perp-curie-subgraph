import fetch from "node-fetch"

type Response = {
    data: { [key: string]: { subgraph: string } | null }
}

class Main {
    readonly graphNodes = {
        op: [
            {
                label: "official",
                name: "perpetual-protocol/perpetual-v2-optimism",
                endpoint: "https://api.thegraph.com/index-node/graphql",
            },
        ],
        goerli: [
            {
                label: "official",
                name: "perpetual-protocol/perpetual-v2-optimism-goerli",
                endpoint: "https://api.thegraph.com/index-node/graphql",
            },
        ],
    }

    async start() {
        for (const [network, subgraphs] of Object.entries(this.graphNodes)) {
            for (const subgraph of subgraphs) {
                console.log({
                    network,
                    label: subgraph.label,
                    currnetSubgraphId: await this.queryId(subgraph, true),
                    pendingSubgraphId: await this.queryId(subgraph, false),
                })
            }
        }
    }

    private async queryId(subgraph: { name: string; endpoint: string }, isCurrent: boolean) {
        const queryName = `indexingStatusFor${isCurrent ? "Current" : "Pending"}Version`
        const query = this.createQuery(queryName, subgraph.name)
        const resp: Response = await this.query(subgraph.endpoint, query)
        const subgraphId = resp.data[queryName]?.subgraph
        return subgraphId
    }

    private createQuery(queryName: string, subgraphName: string) {
        return `{
            ${queryName}(subgraphName: "${subgraphName}")
            { subgraph }
        }`
    }

    private async query(endpoint: string, query: string) {
        const resp = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ query }),
        })
        return resp.json()
    }
}

if (require.main === module) {
    new Main().start()
}
