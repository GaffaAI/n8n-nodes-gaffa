# Qualify inbound website leads from forms with Gaffa and HubSpot

Check every new lead against your ideal customer before it lands in HubSpot.

### Who's it for
Founders and sales teams who want to follow up on the right leads first.

### How it works
- The form asks for the name, work email and company website. Leads already in HubSpot, matched on the email, are skipped.
- [Gaffa](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) loads the website in a real browser and its `parse_json` action returns the company name, industry, what they sell and whether they match your ideal customer from the Settings node. No AI key needed.
- A lead that fits goes into HubSpot as Open with a follow-up task for sales, and one that does not as Unqualified.
- If the website cannot be read, the lead is still added as New, with a review task that says why.

### Setup
1. Install the [Gaffa community node](https://www.npmjs.com/package/@gaffa-dev/n8n-nodes-gaffa).
2. Create an API key at [gaffa.dev](https://gaffa.dev/?utm_source=n8n&utm_medium=referral&utm_campaign=n8n-nodes-gaffa) and add it as the Gaffa API credential.
3. In HubSpot, create a service key under Settings > Integrations > Service Keys with the `crm.objects.contacts` read and write scopes and add it as the HubSpot Service Key credential.
4. Describe your ideal customer in the Settings node.
5. Publish the workflow and share the form's production URL.

### Requirements
- A Gaffa API key
- A HubSpot service key with the `crm.objects.contacts` read and write scopes

### Customization tips
- Add questions to the form, like company size, and map them in the three nodes that add the lead.
- Add fields to the Read the company website node, like pricing model, and use them in the check.
- Put a HubSpot owner ID in Settings to assign the tasks.
