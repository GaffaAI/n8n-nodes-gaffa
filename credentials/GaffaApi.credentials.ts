import {
	Icon,
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GaffaApi implements ICredentialType {
	name = 'gaffaApi';

	displayName = 'Gaffa API';

	icon: Icon = 'file:gaffa.svg';

	documentationUrl = 'https://gaffa.dev/docs/api-reference/api-reference';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.gaffa.dev',
			url: '/v1/schemas',
			headers: { 'User-Agent': 'n8n-nodes-gaffa' },
		},
	};
}
