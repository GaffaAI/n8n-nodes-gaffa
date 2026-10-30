# Archive changed web pages as PDFs in Google Drive with Google Sheets and Gaffa

Keep a dated PDF of the pages you care about. Each morning the workflow checks the pages in a Google Sheet and saves a new PDF to Google Drive when the text has changed.

### Who's it for
Compliance and legal teams keeping a record of terms and policies, and teams tracking competitor pricing pages.

### How it works
- [Gaffa](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) opens each page in a real browser and waits a few seconds, so JavaScript-rendered pages work. In one request it turns the page into text with `generate_markdown` and prints it to a PDF with `print`.
- A hash of the text is compared with the one in the sheet. When it differs, the PDF goes to your Drive folder as "Name date.pdf" and the row gets the new hash, the date and a link.
- The first run saves a PDF of every page. A page that cannot be read is noted in Status.

### Setup
1. Install the [Gaffa community node](https://www.npmjs.com/package/@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at [gaffa.dev](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) and add it as the Gaffa API credential.
3. Create a Google Sheet with a tab named Pages and the columns Name, Page URL, Selector, Last hash, Last changed, Last PDF, Last checked and Status, and add your pages.
4. Create a folder in Google Drive for the PDFs.
5. Connect Google Sheets and Google Drive, put the sheet URL and the folder URL in Settings and publish.

### Requirements
- A Gaffa API key
- A Google account for Sheets and Drive

### Customization tips
- Pages with dates or ads change daily. Put a CSS selector like `main` in the Selector column to compare only that part. A selector that matches nothing shows as a failed read.
- Raise `wait_seconds` in Settings for pages that load slowly.
- Add margin or orientation to the print action in the Read the page node.
- Change the time in the Every morning node.
