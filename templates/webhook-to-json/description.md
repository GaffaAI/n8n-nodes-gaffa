# Title

Webhook to structured JSON with Gaffa

# Description

Turn any web page into structured JSON on demand. POST a URL and a list of fields to the webhook and it returns just those fields, pulled straight from the live page. One reusable endpoint for every extraction, the field list changes per request so you never touch the workflow again.

## Who's it for

Developers and no-code builders who want a single "give me these fields from this URL" endpoint to call from their own apps, forms or agents.

## How it works

- You POST a JSON body with a url, a fields list, and an optional selector.
- The Build request node turns your field list into a Gaffa parse_json request, so the schema is whatever you asked for.
- The Gaffa node loads the page in a real browser, so JavaScript-rendered pages work, and extracts the fields.
- Respond to Webhook sends the extracted object straight back to the caller.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev and add it as the Gaffa API credential.
3. Activate the workflow and POST to the webhook URL.

Setup takes about five minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed

## How to customize the workflow

- The selector is optional, on large pages point it at the region holding the data so the extraction stays focused.
- Add or remove fields per request, no workflow change needed.
- Swap the Respond node's body if you want to wrap the result, for example add the source URL alongside the extracted fields.

# Example request

```
POST /webhook/extract
{
  "url": "https://example.com/product",
  "selector": "main",
  "fields": [
    { "name": "title", "type": "string", "description": "The product title" },
    { "name": "price", "type": "string", "description": "The listed price" }
  ]
}
```

# Submission notes (not part of the description)

- The dashboard takes only the workflow JSON, the sticky carries this text for the user.
- Submit only after the previous template in the queue is approved, one at a time until the queue is cleared.
