# Testing

Manual smoke tests for the node's three operations against the live Gaffa API. Run them with the node installed (see the README) and a Gaffa API credential attached. Use a small page like example.com so `parse_json` stays clear of the trouble it can hit on very large pages.

A pass means the returned item is `state: "completed"` with no top-level `error`, and the action inside it also succeeded: `actions[0]` has no `error` and its `output` holds real content. A request can finish `completed` while its action failed, so the action-level check matters.

## Convert to Markdown

1. Add a Gaffa node, set Operation to **Convert to Markdown**.
2. URL: `https://example.com`. Leave Wait for Completion on. Execute.

Expected: `state: "completed"` with the page markdown inline in `actions[0].output` (the "Example Domain" page text).

## Extract to JSON

1. Set Operation to **Extract to JSON**. URL: `https://example.com`.
2. Fields to Extract, add two:
   - Name `title`, Type `String`, Description `The main heading of the page`
   - Name `description`, Type `String`, Description `The paragraph of body text`
3. Leave Wait for Completion on. Execute.

Expected: `state: "completed"`, with `actions[0].output` holding `title` around "Example Domain" and `description` holding the paragraph text. `parse_json` can fail on very large pages, surfacing as an error on the action rather than a failed request, but example.com is tiny.

## Send Request

1. Set Operation to **Send Request**.
2. Request Body (JSON):

```json
{
  "url": "https://example.com",
  "max_cache_age": 0,
  "settings": {
    "time_limit": 60000,
    "actions": [
      { "type": "generate_markdown", "output_type": "inline" }
    ]
  }
}
```

3. Leave Wait for Completion on. Execute.

Expected: `state: "completed"` with the page markdown inline in `actions[0].output`.

## On every run

- `state` is `completed` with no top-level `error`.
- The action succeeded too: `actions[0].error` is absent and `actions[0].output` holds real content (the extracted fields or the markdown), not an empty value. A `completed` request with an empty or errored action is a fail, not a pass.
- Note `credit_usage` from the result for the cost of each.
- A NodeOperationError should carry a clear message. A failed state returns fast, so a real request failure shows a clear message rather than waiting out the timeout.
