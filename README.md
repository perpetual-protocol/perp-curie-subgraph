![image](https://user-images.githubusercontent.com/105896/160323162-cf5b2e70-a9e1-49c8-a84e-da18df6e4f7b.png)



# perp-curie-subgraph

## Changelog

[Changelog](CHANGELOG.md)

## Subgraphs

### The Graph

-   Optimism
    -   Explorer: `https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism`
    -   HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    -   WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
-   Optimism Kovan
    -   Explorer: `https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism-kovan`
    -   HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan`
    -   WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan`
-   Optimism Kovan Dev 1
    -   Explorer: `https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism-kovan-dev1`
    -   HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev1`
    -   WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev1`
-   Optimism Kovan Dev 2
    -   Explorer: `https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism-kovan-dev2`
    -   HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev2`
    -   WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev2`

### Self-hosted Graph Node

-   Optimism
    -   Explorer: `https://subgraph-api-singapore.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism/graphql`
    -   HTTP: `https://subgraph-api-singapore.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    -   WebSocket: `wss://subgraph-ws-singapore.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
-   Optimism Kovan
    -   Explorer: `https://subgraph.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan/graphql`
    -   HTTP: `https://subgraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan`
    -   WebSocket: `wss://subgraph-ws.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan`
-   Optimism Kovan Dev 1
    -   Explorer: `https://subgraph.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev1/graphql`
    -   HTTP: `https://subgraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev1`
    -   WebSocket: `wss://subgraph-ws.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev1`
-   Optimism Kovan Dev 2
    -   Explorer: `https://subgraph.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev2/graphql`
    -   HTTP: `https://subgraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev2`
    -   WebSocket: `wss://subgraph-ws.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-kovan-dev2`

## Deployment

```bash
npm i

# deploy to The Graph
npx graph auth --product hosted-service <YOUR_THE_GRAPH_ACCESS_TOKEN>
# create a subgraph in the graph dashboard first (need github admin permission)
npm run deploy-the-graph:optimism-kovan

# deploy to self-hosted graph node
kubectl port-forward service/graph-node 8020:8020
npx graph create perpetual-protocol/perpetual-v2-optimism-kovan --node http://127.0.0.1:8020
npm run deploy-self-hosted:optimism-kovan
```

---

> If any features/functionalities described in the Perpetual Protocol documentation, code comments, marketing, community discussion or announcements, pre-production or testing code, or other non-production-code sources, vary or differ from the code used in production, in case of any dispute, the code used in production shall prevail.
