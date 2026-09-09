# Title

Convert a list of URLs into clean markdown files in Google Drive with Gaffa

# Description

Keep a list of URLs in a Google Sheet and let this workflow turn each page into clean, LLM-ready markdown and drop it into Google Drive. It runs on a schedule, picks up only the rows it has not done yet, and marks each one when it is finished, so you can add URLs over time and it just works through them.

Good for building a knowledge base, feeding web content to AI tools, or archiving pages as text, without writing a scraper.

## Who's it for

Anyone collecting web pages as text at more than one-off scale: AI builders preparing context, teams filling a knowledge base, researchers archiving sources.

## How it works

- A Schedule Trigger runs the workflow on a cadence you set.
- It reads your Google Sheet and keeps only rows that have a URL and are not marked done.
- Each URL goes through the Gaffa node, which loads the page in a real browser, so JavaScript-heavy pages work, and converts it to clean markdown.
- A small clean-up step strips leftover links and navigation noise.
- The markdown is saved as a file in your Google Drive folder.
- The sheet row is marked done, so the next run skips it. If a page fails, the row is marked with an error instead and the run carries on.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev and add it as the Gaffa API credential.
3. Connect your Google Sheets and Google Drive accounts.
4. Copy the sample sheet (linked in the workflow) and add your URLs, or point the Read node at your own sheet with a url column and a status column.
5. Pick your Drive folder in the Save node and set the schedule, then activate the workflow.

Setup takes about ten minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed
- A Google Sheets credential and a sheet with a url column and a status column
- A Google Drive credential and a folder to save into

## How to customize the workflow

- Set the CSS selector option in the Gaffa node to keep only the page's main content, for example `main` or `article`.
- Change the Schedule Trigger to match how often you add URLs.
- Adjust the batch size on the loop to control how many pages run per pass.
- Swap Google Drive for another destination. The markdown is available at that point.

# Self-hosted only

This template uses the Gaffa community node. Community nodes run on self-hosted n8n. Install it under Settings, Community Nodes.

# Submission notes (not part of the description)

- Reworked from the rejected single-scrape demo (GAF-806) into a real batch job, mirroring the shape of an already-approved library template.
- The "Self-hosted only" note above is the default while the node's n8n Cloud verification is unconfirmed. If the node is confirmed verified for Cloud, replace it with wording that says a Cloud instance owner can install it from the nodes panel, and ask the reviewer whether the disclaimer is still required.
- Add a workflow image at the top of the description in the dashboard, a canvas screenshot taken after importing and running the workflow.
- The workflow JSON to submit is the one exported from the instance after a live test run, with credential, instance, sheet and folder ids scrubbed, not the hand-authored draft.
- One template in review at a time until three are approved.
