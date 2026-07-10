import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
	sleep,
} from 'n8n-workflow';

const API_BASE = 'https://api.gaffa.dev';
const USER_AGENT = 'n8n-nodes-gaffa';

export class Gaffa implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Gaffa',
		name: 'gaffa',
		icon: 'file:gaffa.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Send browser-automation requests to the Gaffa API',
		usableAsTool: true,
		defaults: {
			name: 'Gaffa',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'gaffaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Convert to Markdown',
						value: 'markdown',
						description: 'Fetch a URL and return its content as markdown',
						action: 'Convert a page to markdown',
					},
					{
						name: 'Extract to JSON',
						value: 'extract',
						description: 'Extract structured data from a URL with parse_json (token-priced)',
						action: 'Extract structured data from a page',
					},
					{
						name: 'Send Request',
						value: 'sendRequest',
						description: 'Submit a raw Gaffa request body',
						action: 'Send a raw request',
					},
				],
				default: 'markdown',
			},
			{
				displayName: 'Request Body (JSON)',
				name: 'body',
				type: 'json',
				default:
					'{\n  "url": "https://example.com",\n  "max_cache_age": 0,\n  "settings": {\n    "time_limit": 60000,\n    "actions": [\n      { "type": "generate_markdown", "output_type": "inline" }\n    ]\n  }\n}',
				displayOptions: {
					show: {
						operation: ['sendRequest'],
					},
				},
				description: 'The full body sent to POST /v1/browser/requests',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://example.com',
				displayOptions: {
					show: {
						operation: ['markdown', 'extract'],
					},
				},
				description: 'The page to load',
			},
			{
				displayName: 'CSS Selector',
				name: 'selector',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['markdown'],
					},
				},
				description: 'Optional CSS selector to limit the markdown to one element',
			},
			{
				displayName: 'Fields to Extract',
				name: 'fields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						operation: ['extract'],
					},
				},
				description: 'The fields parse_json should pull from the page',
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the field to extract',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								default: 'string',
								options: [
									{ name: 'Array', value: 'array' },
									{ name: 'Boolean', value: 'boolean' },
									{ name: 'Datetime', value: 'datetime' },
									{ name: 'Decimal', value: 'decimal' },
									{ name: 'Double', value: 'double' },
									{ name: 'Integer', value: 'integer' },
									{ name: 'Object', value: 'object' },
									{ name: 'String', value: 'string' },
								],
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'What this field is, to guide extraction',
							},
						],
					},
				],
			},
			{
				displayName: 'Extraction Instruction',
				name: 'instruction',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['extract'],
					},
				},
				description: 'Optional extra guidance passed alongside the schema',
			},
			{
				displayName: 'Wait for Completion',
				name: 'waitForCompletion',
				type: 'boolean',
				default: true,
				description: 'Whether to poll until the request finishes and return the result. If off, returns the request ID immediately.',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Max Cache Age (ms)',
						name: 'maxCacheAge',
						type: 'number',
						default: 0,
						displayOptions: { show: { '/operation': ['markdown', 'extract'] } },
						description: 'Set 0 to bypass the cross-user cache and force a fresh fetch',
					},
					{
						displayName: 'Poll Interval (ms)',
						name: 'pollInterval',
						type: 'number',
						default: 2000,
						description: 'How long to wait between polls when waiting for completion',
					},
					{
						displayName: 'Poll Timeout (ms)',
						name: 'pollTimeout',
						type: 'number',
						default: 120000,
						description: 'Give up waiting after this long and report a timeout',
					},
					{
						displayName: 'Proxy Location',
						name: 'proxyLocation',
						type: 'options',
						default: '',
						displayOptions: { show: { '/operation': ['markdown', 'extract'] } },
						options: [
							{ name: 'France', value: 'fr' },
							{ name: 'Ireland', value: 'ie' },
							{ name: 'None', value: '' },
							{ name: 'Singapore', value: 'sg' },
							{ name: 'United States', value: 'us' },
						],
					},
					{
						displayName: 'Record Request',
						name: 'recordRequest',
						type: 'boolean',
						default: false,
						displayOptions: { show: { '/operation': ['markdown', 'extract'] } },
						description: 'Whether to store a recording so the request can be debugged later',
					},
					{
						displayName: 'Time Limit (ms)',
						name: 'timeLimit',
						type: 'number',
						default: 60000,
						displayOptions: { show: { '/operation': ['markdown', 'extract'] } },
						description:
							'Max runtime. Keep below your plan max (Starter 60000, Startup 120000, Growth 300000).',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const options = this.getNodeParameter('options', i, {}) as IDataObject;
				const timeLimit = (options.timeLimit as number) ?? 60000;

				let body: IDataObject;

				if (operation === 'sendRequest') {
					const raw = this.getNodeParameter('body', i) as IDataObject | string;
					body = typeof raw === 'string' ? (JSON.parse(raw) as IDataObject) : raw;
				} else {
					let url = this.getNodeParameter('url', i) as string;
					if (url && !/^https?:\/\//i.test(url)) {
						url = `https://${url}`;
					}
					const action: IDataObject =
						operation === 'markdown'
							? { type: 'generate_markdown', output_type: 'inline' }
							: { type: 'parse_json', output_type: 'inline' };

					if (operation === 'markdown') {
						const selector = this.getNodeParameter('selector', i, '') as string;
						if (selector) {
							action.selector = selector;
						}
					} else {
						const fieldsCollection = this.getNodeParameter('fields', i, {}) as IDataObject;
						const rows = (fieldsCollection.field as IDataObject[]) ?? [];
						if (rows.length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'Add at least one field to extract',
								{ itemIndex: i },
							);
						}
						action.data_schema = {
							name: 'extract',
							description: 'Structured data extracted from the page',
							fields: rows.map((row) => ({
								type: row.type,
								name: row.name,
								description: row.description,
							})),
						};
						const instruction = this.getNodeParameter('instruction', i, '') as string;
						if (instruction) {
							action.instruction = instruction;
						}
					}

					body = {
						url,
						max_cache_age: (options.maxCacheAge as number) ?? 0,
						settings: {
							time_limit: timeLimit,
							record_request: (options.recordRequest as boolean) ?? false,
							actions: [action],
						},
					};
					if (options.proxyLocation) {
						body.proxy_location = options.proxyLocation;
					}
				}

				const submitResponse = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'gaffaApi',
					{
						method: 'POST',
						url: `${API_BASE}/v1/browser/requests`,
						headers: { 'User-Agent': USER_AGENT },
						body,
						json: true,
					},
				)) as IDataObject;

				let data = (submitResponse.data as IDataObject) ?? submitResponse;

				const waitForCompletion = this.getNodeParameter('waitForCompletion', i, true) as boolean;
				const requestId = data.id as string | undefined;

				const isInFlight = (d: IDataObject) =>
					(d.state === 'pending' || d.state === 'running') && !d.error;

				if (waitForCompletion && isInFlight(data) && requestId) {
					const pollInterval = (options.pollInterval as number) ?? 2000;
					const pollTimeout = (options.pollTimeout as number) ?? 120000;
					const deadline = Date.now() + pollTimeout;

					do {
						await sleep(pollInterval);
						const pollResponse = (await this.helpers.httpRequestWithAuthentication.call(
							this,
							'gaffaApi',
							{
								method: 'GET',
								url: `${API_BASE}/v1/browser/requests/${requestId}`,
								headers: { 'User-Agent': USER_AGENT },
								json: true,
							},
						)) as IDataObject;
						data = (pollResponse.data as IDataObject) ?? pollResponse;
					} while (isInFlight(data) && Date.now() < deadline);

					if (isInFlight(data)) {
						throw new NodeOperationError(
							this.getNode(),
							`Gaffa request ${requestId} did not finish within ${pollTimeout} ms`,
							{ itemIndex: i },
						);
					}
				}

				if (waitForCompletion && (data.state === 'failed' || data.error)) {
					throw new NodeOperationError(
						this.getNode(),
						`Gaffa request failed: ${data.error ?? 'unknown'}${data.error_reason ? ` (${data.error_reason})` : ''}`,
						{ itemIndex: i },
					);
				}

				if (waitForCompletion) {
					const actions = (data.actions as IDataObject[]) ?? [];
					const failedAction = actions.find((action) => action && action.error);
					if (failedAction) {
						throw new NodeOperationError(
							this.getNode(),
							`Gaffa action failed: ${failedAction.error}`,
							{ itemIndex: i },
						);
					}
				}

				returnData.push({ json: data, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				if (error instanceof NodeOperationError) {
						throw new NodeOperationError(this.getNode(), error.message, { itemIndex: i });
					}
					throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
