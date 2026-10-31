# Track web page table changes with Google Sheets and Gaffa

Keep a Google Sheet in step with a table on any web page and see what changed.

### Who's it for
Anyone watching a table they don't control: release schedules, vendor sub-processor lists, price lists, shortage lists, rankings.

### How it works
- [Gaffa](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) loads the page in a real browser and its `parse_table` action turns the table into rows, with the headers as column names.
- The workflow reads your sheet and compares both on a key column with the Compare Datasets node.
- New rows are added, changed rows are updated in place and rows gone from the page get a removed date.
- Every change lands in a Changes tab with the date, the key, the type and the old and new values.
- If the table cannot be read, the run stops with an error instead of marking every row as removed.

### Setup
1. Install the [Gaffa community node](https://www.npmjs.com/package/@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at [gaffa.dev](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) and add it as the Gaffa API credential.
3. Connect Google Sheets and create a spreadsheet with two empty tabs, Table and Changes.
4. In the Settings node, set the page URL, the CSS selector of the table, a key column that is unique per row and the spreadsheet URL.
5. Run it once to fill the sheet, then publish the workflow.

### Requirements
- A Gaffa API key
- A Google Sheets credential

### Customization tips
- Gaffa lowercases headers and turns anything other than letters and numbers into underscores, so `Ticket Price (£)` becomes `ticket_price_`. Use that name as the key column.
- Change the time in the Every morning node.
- Send the new Changes rows by email or Slack after the Write to the change log node.
