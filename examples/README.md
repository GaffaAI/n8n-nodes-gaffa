# Examples

Importable n8n workflows that use the Gaffa node.

## chat-test-workflow.json

A three-node chat workflow: a chat trigger passes a URL to the Gaffa node, which returns the page as markdown, and a Set node exposes it as `output`. To use it, open n8n, choose Import from File, and select this file. Add your Gaffa API credential on the Gaffa node before running.
