# Email new article digests from any web page with Gaffa and Resend

Get an email whenever a page you follow publishes something new. The workflow checks the page on a schedule, remembers what it has already sent, and mails the new items as one digest. No feed needed.

### Who's it for
Anyone following a blog, a news site or a changelog that offers no feed and no newsletter.

### How it works
- The Schedule Trigger checks the page on a cadence you pick, hourly by default.
- [Gaffa](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) loads the page in a real browser, so JavaScript-rendered lists work, and extracts every article as title, url and date.
- The Keep only new articles node compares each URL against a data table of what has already been sent.
- New articles are recorded in the table, formatted into one HTML digest and sent through Resend.

### Setup
1. Install the [Gaffa community node](https://www.npmjs.com/package/@gaffa-dev/n8n-nodes-gaffa) and the [Resend community node](https://www.npmjs.com/package/n8n-nodes-resend).
2. Create an API key at [gaffa.dev](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) and add it as the Gaffa API credential.
3. Connect your Resend account in Send the digest and set the from and to addresses.
4. Put the page URL and the article list's CSS selector into the Settings node, then activate the workflow.

### Requirements
- A Gaffa API key
- A Resend account

### Customization tips
- Adjust the Schedule Trigger to how often the page updates.
- The selector narrows what Gaffa reads, pick the element that wraps the article list.
- Clear the seen_articles data table to get the full list again in the next digest.
