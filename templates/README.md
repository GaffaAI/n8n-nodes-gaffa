# Workflow templates

Templates for n8n's template library, each folder holds the workflow JSON and the description for the submission.

The n8n Creator Dashboard takes only the workflow JSON, so the sticky note inside the workflow carries everything a user sees before import. The description file keeps the title, the library description and the submission notes together.

Both templates here are tested end to end on a local n8n with the published node installed from npm.

- `url-to-markdown`: chat workflow, URL in, clean markdown out. Submitted to the library on 28 Aug, under review.
- `table-to-sheets`: scrapes an HTML table into Google Sheets. Ready to submit once the first one is approved, new creators can only have one submission pending.
