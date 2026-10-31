# Convert URLs from Google Sheets to Drive markdown files with Gaffa

Keep a list of URLs in a Google Sheet and let the workflow turn each page into clean markdown in Google Drive. It runs on a schedule and marks each row as it goes.

### Who's it for
Anyone collecting web pages as text: AI builders preparing context, teams filling a knowledge base.

### How it works
- The workflow reads your sheet and keeps the rows that have a URL and no status yet.
- [Gaffa](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) loads each page in a real browser, so JavaScript-heavy pages work, and converts it to markdown.
- A code step strips leftover links and blank lines.
- Drive saves the markdown and the row is marked done, a page that fails is marked with an error and the run carries on.

### Setup
1. Install the [Gaffa community node](https://www.npmjs.com/package/@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at [gaffa.dev](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) and add it as the Gaffa API credential.
3. Connect Google Sheets and Google Drive.
4. Copy the sample sheet from the canvas sticky, or make your own with `url` and `status` columns.
5. Pick your Drive folder on the Save to Drive node and activate the workflow.

### Requirements
- A Gaffa API key
- A Google Sheets credential and a sheet with `url` and `status` columns
- A Google Drive credential and a folder to save into

### Customization tips
- Set a selector on the Gaffa node to keep only the main content, for example `main` or `article`.
- Change the batch size on the loop to control how many pages run per pass.
- Point the Save to Drive node elsewhere, the markdown sits on the item.
