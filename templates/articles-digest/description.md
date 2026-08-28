# Title

Watch a page for new articles and email a digest with Gaffa

# Description

Get an email whenever a page you care about publishes something new. Point the workflow at any page that lists articles, it checks the page on a schedule, remembers what it has already seen, and sends only the new articles as one digest. No RSS feed needed.

## Who's it for

Anyone who follows a blog, news site, changelog, or job board that has no feed or newsletter.

## How it works

- The Schedule Trigger checks the page on a cadence you pick.
- The Gaffa node loads the page in a real browser, so JavaScript-rendered lists work, and extracts every article as title, url and date.
- A small Code node keeps the URLs it has seen in workflow static data and lets only new articles through.
- New articles are formatted into one HTML digest and sent by email.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev and add it as the Gaffa API credential.
3. Add your SMTP credential and the from and to addresses in the Send the digest node.
4. Enter your page URL and the article list's CSS selector in the Settings node, then activate the workflow.

Setup takes about five minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed
- An SMTP credential for sending the email

## How to customize the workflow

- Adjust the Schedule Trigger to how often the page updates, hourly is a sensible start.
- The selector narrows what the extraction reads. Pick the element wrapping the article list, for example `#main` or `.post-list`, and find it with the browser dev tools.
- Seen URLs only persist in production runs, a manual test run always emails the full list.
- Swap the email node for Slack or Telegram if you prefer the digest there.

# Submission notes (not part of the description)

- The dashboard takes only the workflow JSON, the sticky carries this text for the user.
- Verified in a live run on 28 Aug: extraction, Split Out on actions[0].output.articles, dedup across two production runs (static data persisted, second run passed only new URLs), and a real SMTP delivery into a local mail sink.
- Section stickies are required at 4+ nodes: add two white stickies in the editor while taking the screenshot, one over Settings plus Extract ("Configure and extract") and one over the dedup, format and send nodes ("Dedup and deliver"), or recolor if added here.
- Submit only after the previous template in the queue is approved, one at a time until three are approved.
