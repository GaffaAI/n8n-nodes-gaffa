# Title

Scrape job listings into Airtable with Gaffa

# Description

Turn any job board page into a clean Airtable base. Point the workflow at a listings page, run it, and every job lands as a record with title, location and link. Re-runs update existing records instead of duplicating them, so you can track a board over time.

## Who's it for

Recruiters, job seekers, and anyone tracking openings on boards that offer no export or API.

## How it works

- You put the page URL and the listings container's CSS selector into the Settings node.
- The Gaffa node loads the page in a real browser, so JavaScript-rendered boards work, and extracts every job as title, location and link.
- The list is split into one item per job.
- Airtable upserts the records keyed on the link, so a job that is already in the table gets updated, not duplicated.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev and add it as the Gaffa API credential.
3. Connect your Airtable account and pick a base and table with the fields title, location and link.
4. Enter your page URL and listings selector in the Settings node and run it.

Setup takes about five minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed
- An Airtable credential and a table with the fields title, location and link

## How to customize the workflow

- Swap the manual trigger for a Schedule Trigger to pull new listings on a cadence, the upsert keeps the table clean.
- The selector narrows what the extraction reads. Pick the element wrapping the job list and find it with the browser dev tools.
- Add fields like salary or company to the schema in the Gaffa node's body and to your table if the page shows them.

# Submission notes (not part of the description)

- The dashboard takes only the workflow JSON, the sticky carries this text for the user.
- Verified in a live run on 28 Aug: 30 jobs extracted from news.ycombinator.com/jobs, the upsert created 30 records in a real Airtable base and a re-run updated the same 30 records with no duplicates.
- Section stickies are required at 4+ nodes: add two white stickies in the editor while taking the screenshot, one over Settings plus Extract ("Configure and extract") and one over the split and Airtable nodes ("Deliver the records"), or recolor if added here.
- Submit only after the previous template in the queue is approved, one at a time until three are approved.
