# n8n-nodes-gaffa

An n8n community node for [Gaffa](https://gaffa.dev), the browser-automation API. Use it to run Gaffa browser requests from a workflow: send a raw request, pull a page as markdown, or extract structured JSON.

## Installation

In n8n, go to Settings > Community Nodes and install `@gaffa-dev/n8n-nodes-gaffa`. For a self-hosted instance you can also `npm install @gaffa-dev/n8n-nodes-gaffa` in your n8n custom nodes folder.

## Credentials

Create a Gaffa API credential and paste your API key. The key is sent as the `X-API-Key` header on every request. You can get a key from your Gaffa dashboard.

## Operations

### Send Request
Paste a full Gaffa request body as JSON. This maps directly to `POST /v1/browser/requests`, so you can use any action and setting Gaffa supports. Good when you already know the request structure.

### Convert to Markdown
Give a URL and get the page back as markdown. Builds a `generate_markdown` action with inline output, so the content comes back in the response rather than as a file link.

### Extract to JSON
Give a URL and a list of fields (name, type, description). Builds a `parse_json` action with an inline schema and returns the extracted data. This action is token-priced, so cost is per call rather than fixed.

## Example

Extract the title and first paragraph from a page:

1. Add a Gaffa node and set Operation to Extract to JSON.
2. Set URL to `https://example.com`.
3. Add two fields:
   - `title` (String): the main heading of the page
   - `description` (String): the first paragraph of body text
4. Execute. The node returns the request result, with the extracted data in `actions[0].output`, for example `{"title": "Example Domain", "description": "..."}`.

## Waiting for completion

Gaffa requests are asynchronous. By default the node submits the request and polls until it finishes, then returns the result. Turn off "Wait for Completion" to get the request id back immediately and poll it yourself later. Poll interval and timeout are in the Options section.

## Notes

- Time limit defaults to 60000 ms. Keep it below your plan max (Starter 1 min, Startup 2 min, Growth 5 min).

## License

MIT
