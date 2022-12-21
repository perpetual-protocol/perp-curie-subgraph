![image](https://user-images.githubusercontent.com/105896/160323162-cf5b2e70-a9e1-49c8-a84e-da18df6e4f7b.png)

# perp-curie-subgraph

## Changelog

[Changelog](CHANGELOG.md)

## Subgraphs

### The Graph

- Optimism
    - Playground: https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism
    - HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - Healthcheck: `https://api.thegraph.com/index-node/graphql`
- Optimism Goerli
    - Playground: https://thegraph.com/hosted-service/subgraph/perpetual-protocol/perpetual-v2-optimism-goerli
    - HTTP: `https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - WebSocket: `wss://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - Healthcheck: `https://api.thegraph.com/index-node/graphql`

### Self-hosted Graph Node

- Optimism
    - Playground: https://thegraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism/graphql
    - HTTP: `https://thegraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - WebSocket: `wss://thegraph-ws.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - Healthcheck: `https://thegraph-hc.perp.fi/graphql`
- Optimism
    - Playground: https://subgraph-api-singapore.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism/graphql
    - HTTP: `https://subgraph-api-singapore.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - WebSocket: `wss://subgraph-ws-singapore.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism`
    - Healthcheck: `https://subgraph-hc-singapore.perp.fi/graphql`
- Optimism Goerli
    - Playground: https://subgraph.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli/graphql
    - HTTP: `https://subgraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - WebSocket: `wss://subgraph-ws.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - Healthcheck: `https://subgraph-hc.perp.fi/graphql`

## Deployment

```bash
npm i

# deploy to The Graph
npx graph auth --product hosted-service <YOUR_THE_GRAPH_ACCESS_TOKEN>
# create a subgraph in the graph dashboard first (need GitHub admin permission)
npm run deploy-the-graph:optimism

# deploy to self-hosted graph node
kubectl port-forward service/graph-node-cluster-index 8020:8020
npx graph create perpetual-protocol/perpetual-v2-optimism --node http://127.0.0.1:8020
npm run deploy-self-hosted:optimism
```

---

> If any features/functionalities described in the Perpetual Protocol documentation, code comments, marketing, community discussion or announcements, pre-production or testing code, or other non-production-code sources, vary or differ from the code used in production, in case of any dispute, the code used in production shall prevail.
