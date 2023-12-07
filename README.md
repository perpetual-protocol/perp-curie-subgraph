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

### Satsuma

- Optimism
    - Playground: https://subgraph.satsuma-prod.com/perp/perpetual-v2-optimism/playground
    - HTTP: `https://subgraph.satsuma-prod.com/<SATSUMA_QUERY_KEY>/perp/perpetual-v2-optimism/api`
    - Healthcheck: `https://subgraph.satsuma-prod.com/<SATSUMA_QUERY_KEY>/perp/perpetual-v2-optimism/status`

## Development

### Checklist

- `scripts/updateABIs.ts`
  - when adding new contracts, remember to include the newly added contract names to `abiNames` so it would be pre-processed

## Deployment

### Configure

Update `scripts/updateConfigs.ts` if we're using [graft](https://thegraph.com/docs/en/developing/creating-a-subgraph/#grafting-onto-existing-subgraphs) to speed up indexing.

### Local Deploy

We will automatically trigger deployments in CI, but we can also deploy from a local machine.

```bash
npm i

# deploy to The Graph
npx graph auth --product hosted-service <THE_GRAPH_ACCESS_TOKEN>
# create a subgraph in the graph dashboard first (need GitHub admin permission)
npm run deploy-the-graph:optimism

# deploy to Satsuma
npm run codegen-satsuma:optimism
npx graph deploy perpetual-v2-optimism --version-label $(git rev-parse --short HEAD) --node https://app.satsuma.xyz/api/subgraphs/deploy --ipfs https://api.thegraph.com/ipfs/ --deploy-key <SATSUMA_DEPLOY_KEY>
```

### Post Deploy

Wait until all three subgraphs are synced, then click "Promote to Live" button on the newly deployed version to enable it on Satsuma dashboard. Otherwise, clients might get different results from The Graph and Satsuma.

---

> If any features/functionalities described in the Perpetual Protocol documentation, code comments, marketing, community discussion or announcements, pre-production or testing code, or other non-production-code sources, vary or differ from the code used in production, in case of any dispute, the code used in production shall prevail.
