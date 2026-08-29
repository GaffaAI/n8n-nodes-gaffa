# Title

Archive a page to PDF on a schedule with Gaffa

# Description

Keep a dated PDF archive of any web page. On your schedule the workflow prints the page to a PDF and saves it to Google Drive, named by the date, so you build up a history you can look back through. Good for pages that change, a pricing page, a policy, a status page, a competitor's homepage.

## Who's it for

Anyone who needs a paper trail of how a page looked over time, compliance, competitive tracking, or just a personal record.

## How it works

- The Schedule Trigger fires on your interval, daily by default.
- You set the page URL in the Settings node.
- The Gaffa node opens the page in a real browser and prints it to a PDF, so JavaScript-rendered pages work, and returns a file link.
- The HTTP Request node downloads that PDF as binary data.
- Google Drive saves it as page-archive-<date>.pdf, so each run adds a new dated file.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev and add it as the Gaffa API credential.
3. Connect a Google Drive credential and pick the drive and folder on the Save node.
4. Put the page URL into the Settings node and set your schedule.

Setup takes about five minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed
- A Google Drive credential

## How to customize the workflow

- The print action follows the site's print styles. Wide pages such as tables read better with orientation set to landscape, edge to edge designs want margin 0.
- Change the Schedule Trigger to hourly or weekly to match how often the page changes.
- Swap Google Drive for any storage node, the PDF arrives as binary data on the field named data.
- Put the URL in the file name too if you archive more than one page into the same folder.

# Submission notes (not part of the description)

- The dashboard takes only the workflow JSON, the sticky carries this text for the user.
- Submit only after the previous template in the queue is approved, one at a time until the queue is cleared.
