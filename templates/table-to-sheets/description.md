# Title

Scrape a web page table into Google Sheets with Gaffa

# Description

Turn any HTML table on the web into rows in a Google Sheet. Set a URL and a CSS selector, run the workflow, and the table lands in your spreadsheet with the headers as column names. No scraper code, no copy and paste.

## Who's it for

Anyone who tracks tabular data that lives on a web page: price lists, rankings, schedules, directories, results tables.

## How it works

- You put the page URL and the table's CSS selector into the Settings node.
- The Gaffa node loads the page in a real browser, so JavaScript-rendered tables work, and parses the table to JSON.
- The rows are fetched and appended to your Google Sheet, the lowercased headers become the column names.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev and add it as the Gaffa API credential.
3. Connect your Google Sheets account and pick the spreadsheet.
4. Enter your URL and selector in the Settings node and run it.

Setup takes about five minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed
- A Google Sheets credential

## How to customize the workflow

- Swap the manual trigger for a Schedule Trigger to pull the table on a cadence.
- The selector must identify exactly one table, find it with the browser dev tools.
- All values arrive as text, add a Set node after the fetch if you need typed numbers or dates.

# Submission notes (not part of the description)

- The dashboard takes only the workflow JSON, the sticky carries this text for the user.
- Verified in a live run on 28 Aug: the HTTP Request node emits one item per table row (n8n splits the top-level JSON array into items), and the appended rows landed in a real sheet. No Split Out node needed.
- Section stickies are required at 4+ nodes: add two white stickies in the editor while taking the screenshot, one over Settings plus Parse ("Configure and scrape") and one over Fetch plus Sheets ("Deliver the rows"), or recolor if added here.
- Wait for the GAF-806 approval before submitting, one template at a time until three are approved.
