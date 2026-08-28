# Title

Convert web pages to LLM-ready markdown in chat with Gaffa

# Description

Paste a URL into a chat and get the page back as clean, LLM-ready markdown. Useful for anyone feeding web content to AI tools, building a knowledge base, or collecting pages as text, without writing a scraper.

## Who's it for

Anyone who needs web pages as clean text: AI builders preparing context for prompts, writers collecting research, teams filling a knowledge base.

## How it works

- You send a URL in the chat.
- The Gaffa node loads the page in a real browser, so JavaScript-heavy pages work, and converts it to markdown.
- The chat answers with the markdown, ready to copy or pipe into the next tool.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev.
3. Add the key as the Gaffa API credential in n8n.
4. Activate the workflow and open the chat.

Setup takes about five minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed

## How to customize the workflow

- Set the CSS selector option in the Gaffa node to keep only the page's main content, for example `main` or `article`.
- Swap the chat trigger for a webhook or schedule to run it headless.

# Submission notes (not part of the description)

- Submit via the Creator Dashboard: paste the workflow JSON, the title and the description above.
- Add a workflow image at the top of the description in the dashboard, a canvas screenshot after importing the workflow.
- One template in review at a time until three are approved.
