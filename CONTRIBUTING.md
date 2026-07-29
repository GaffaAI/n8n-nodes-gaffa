# Contributing

## Run and test locally

The local setup used Node 24 with n8n 2.26.4.

1. Install n8n once: `npm install -g n8n`.
2. Build and link the node, from the repo root:
   - `npm install && npm run build && npm link`
   - `mkdir -p ~/.n8n/custom && cd ~/.n8n/custom && npm init -y && npm link @gaffa-dev/n8n-nodes-gaffa`
3. Start n8n: `n8n start`, then open http://localhost:5678.
4. The node loads from `~/.n8n/custom` and registers as `CUSTOM.gaffa`, not the published `@gaffa-dev/n8n-nodes-gaffa.gaffa`. The prefix matters if you reference the type in workflow JSON.
5. Create a Gaffa API credential in the UI.

## Gotchas

- Do not drive n8n's internal `/rest` API from page JavaScript. Those calls invalidate the browser session and log you out. Use the UI or the CLI instead.
- To import a workflow from the CLI, `n8n import:workflow --input=file.json` needs a top-level `id` in the JSON.
- n8n 2.26 hosted chat returns the answer synchronously in the HTTP response as `{"output":"..."}`, with no WebSocket. So a chat workflow's final node must output a field named `output`. The shipped `examples/chat-test-workflow.json` does this.

## Reference

- n8n Creator Portal, for node submission and verification: https://creators.n8n.io/nodes
- Similar nodes for comparison: https://n8n.io/integrations/ai-scraper/ and https://n8n.io/integrations/firecrawl/
