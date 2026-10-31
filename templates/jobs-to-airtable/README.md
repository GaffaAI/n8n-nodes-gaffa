# Track and update company job openings in Airtable with Gaffa

See every week which roles the companies on your Airtable watchlist open and close, straight from their careers pages.

### Who's it for
Sales teams using hiring as a buying signal, recruiters and job seekers watching target companies.

### How it works
- Every Monday the workflow reads your companies and their open roles from Airtable.
- [Gaffa](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) loads each careers page in a real browser, so JavaScript job boards like Ashby work, and its `parse_json` action returns the open roles. No AI key needed.
- New roles are added to the Jobs table and linked to their company. Roles gone from the page get a closed date.
- Each company gets its open and new role counts and a status.
- Unreadable pages are noted on the company. If a page lists less than half of the open roles, nothing gets closed.

### Setup
1. Install the [Gaffa community node](https://www.npmjs.com/package/@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at [gaffa.dev](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) and add it as the Gaffa API credential.
3. Create an Airtable base with two tables. Companies: Name, Careers page (URL), Status, Open roles (number), New roles (number), Last checked (date). Jobs: Title, Link (URL), Company (link to Companies), Team, Location, First seen (date), Closed on (date).
4. Create an Airtable personal access token with the data.records:read, data.records:write and schema.bases:read scopes for that base and add it as the Airtable credential.
5. Put the base ID (the app part of its URL) in Settings, add your companies and publish.

### Requirements
- A Gaffa API key
- An Airtable personal access token. Each run uses about one API call per company and per changed role. Mind the Free plan's 1,000 calls a month.

### Customization tips
- Use a careers page URL that lists all roles on one page, or a filtered view for big boards.
- `min_share` in Settings sets how many of the open roles a page must still list before any get closed.
- Change the day and time in the Every Monday node.
