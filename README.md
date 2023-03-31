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
- Optimism Goerli
    - Playground: https://subgraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli/graphql
    - HTTP: `https://subgraph-api.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - WebSocket: `wss://subgraph-ws.perp.fi/subgraphs/name/perpetual-protocol/perpetual-v2-optimism-goerli`
    - Healthcheck: `https://subgraph-hc.perp.fi/graphql`

### Satsuma

- Optimism
    - Dashboard: https://app.satsuma.xyz/subgraphs/119
    - Playground: https://subgraph.satsuma-prod.com/perp/perpetual-v2-optimism/playground
    - HTTP: `https://subgraph.satsuma-prod.com/<QUERY_KEY>/perp/perpetual-v2-optimism/api`

## Deployment

### Configure

Update `scripts/updateConfigs.ts` if we're using [graft](https://thegraph.com/docs/en/developing/creating-a-subgraph/#grafting-onto-existing-subgraphs) to speed up indexing.

### Deploy

```bash
npm i

# deploy to The Graph
npx graph auth --product hosted-service <THE_GRAPH_ACCESS_TOKEN>
# create a subgraph in the graph dashboard first (need GitHub admin permission)
npm run deploy-the-graph:optimism

# deploy to Self-hosted Graph Node
kubectl port-forward service/graph-node-cluster-index 8020:8020
npx graph create perpetual-protocol/perpetual-v2-optimism --node http://127.0.0.1:8020
npm run deploy-self-hosted:optimism

# deploy to Satsuma (currently no automatic deployment in CI)
npm run codegen-satsuma:optimism
# remember to set new version label when deploying new one, format: v1.2.3-feature
# after the indexing completes, we need to manually promote the new version to live on Satsuma dashboard,
# also need to update the endpoint url for our backend services
npx graph deploy perpetual-v2-optimism \
  --version-label v2.0.1-op-market \
  --node https://app.satsuma.xyz/api/subgraphs/deploy \
  --deploy-key <SATSUMA_DEPLOY_KEY>
```

---

> If any features/functionalities described in the Perpetual Protocol documentation, code comments, marketing, community discussion or announcements, pre-production or testing code, or other non-production-code sources, vary or differ from the code used in production, in case of any dispute, the code used in production shall prevail.
