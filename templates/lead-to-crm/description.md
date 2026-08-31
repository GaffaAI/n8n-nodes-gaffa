# Title

Enrich a lead from a URL into HubSpot with Gaffa

# Description

Turn any web page into a HubSpot contact. Give the workflow a lead's page, a personal site, a team page, a company contact page, and it extracts first name, last name, company, role and email, then creates the contact in HubSpot or updates it when the email already exists. No copy and paste, no manual entry.

## Who's it for

Sales and founders who collect leads as links and want them in the CRM without typing.

## How it works

- You put the lead's URL into the Settings node, plus a CSS selector when the details sit in a known page region.
- The Gaffa node loads the page in a real browser, so JavaScript-rendered pages work, and extracts the contact details as structured JSON.
- HubSpot upserts the contact keyed on the email, so running the same lead twice updates instead of duplicating.

## How to set up

1. Install the Gaffa community node (@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at gaffa.dev and add it as the Gaffa API credential.
3. Create a private app in HubSpot with the crm.objects.contacts scopes and add its token as the HubSpot App Token credential.
4. Enter your lead's URL in the Settings node and run it.

Setup takes about five minutes.

## Requirements

- A Gaffa API key (created at gaffa.dev)
- The Gaffa community node installed
- A HubSpot private app token with the contacts scopes

## How to customize the workflow

- Swap the manual trigger for a Webhook to enrich leads sent in by your forms or tools, map the incoming URL onto the Settings node.
- The selector narrows what the extraction reads, on large pages point it at the region holding the contact details.
- Add fields like phone or city to the schema in the Gaffa node's body and map them in the HubSpot node.

# Submission notes (not part of the description)

- The dashboard takes only the workflow JSON, the sticky carries this text for the user.
- Verified in a live run on 28 Aug: the extraction returned all five fields from the default URL for 2 credits, and two runs against a real HubSpot account upserted the same contact, created on the first run and updated on the second.
- Section stickies are required at 4+ nodes: add two white stickies in the editor while taking the screenshot, one over Settings plus Enrich ("Configure and enrich") and one over the HubSpot node ("Deliver the contact"), or recolor if added here.
- Submit only after the previous template in the queue is approved, one at a time until three are approved.
