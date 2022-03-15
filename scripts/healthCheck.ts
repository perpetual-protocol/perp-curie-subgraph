import fetch, { RequestInfo } from "node-fetch"

// const SUBGRAPH_ENDPOINT = "https://api.thegraph.com/index-node/graphql" as RequestInfo
const SUBGRAPH_ENDPOINT = "https://subgraph-singapore.perp.fi:8030/graphql" as RequestInfo

// const SUBGRAPH_NAME = "perpetual-protocol/perpetual-v2-optimism-kovan"
const SUBGRAPH_NAME = "perpetual-protocol/perpetual-v2-optimism"

async function query(query: string): Promise<any> {
    const resp = await fetch(SUBGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query }),
    })
    const data = await resp.json()
    return data
}

async function healthCheck() {
    const queryStr = `
    {
        indexingStatusForCurrentVersion(subgraphName: "${SUBGRAPH_NAME}") {
            synced
            health
            fatalError {
                message
                block {
                number
                hash
                }
                handler
            }
            chains {
                chainHeadBlock {
                number
                }
                latestBlock {
                number
                }
            }
        }
    }`
    const data = await query(queryStr)
    if (data.errors) {
        console.log(data.errors)
    } else {
        const info = data.data.indexingStatusForCurrentVersion
        console.log(info)
        console.log(info.chains)
    }
}

if (require.main === module) {
    healthCheck()
}
