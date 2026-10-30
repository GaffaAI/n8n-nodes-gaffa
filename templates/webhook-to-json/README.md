# Extract structured JSON from web pages via a webhook API with Gaffa

Turn any web page into the JSON you ask for. POST a URL and a list of fields to this webhook and get back just those fields.

### Who's it for
Developers and AI agent builders who want one "give me these fields from this URL" endpoint for their apps, forms or agents.

### How it works
- The webhook only accepts requests that carry a secret key of your choice in a header.
- The Check the request node validates the body and answers 400 with the reason when something is wrong.
- [Gaffa](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) loads the page in a real browser and its `parse_json` action fills in the fields the caller asked for.
- Repeat requests within `max_cache_age` come from Gaffa's cache, which saves time and credits.
- The workflow answers 200 with the data, or 502 with Gaffa's error.

```json
{
  "url": "https://example.com/product",
  "fields": [
    { "name": "title", "description": "The product title" },
    { "name": "price", "type": "double", "description": "The price as a number" }
  ]
}
```

### Setup
1. Install the [Gaffa community node](https://www.npmjs.com/package/@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at [gaffa.dev](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) and add it as the Gaffa API credential.
3. Create a Header Auth credential with a header name like X-API-Key and a secret value, and pick it in the Receive the request node.
4. Publish and POST JSON to the production URL with that header and `Content-Type: application/json`.

### Requirements
- A Gaffa API key

### Customization tips
- Set `max_cache_age` in Settings in seconds. 0 always loads the page fresh.
- Send a `selector` in the body to read only part of the page, which is cheaper and more accurate.
- Field types are string, integer, double, decimal, boolean, datetime, array and object. Array and object fields take their own `fields` list.
