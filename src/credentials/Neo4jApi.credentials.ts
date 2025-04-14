import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class Neo4jApi implements ICredentialType {
	name = 'neo4jApi';
	displayName = 'Neo4j API';
	documentationUrl = 'https://neo4j.com/docs/browser-manual/current/operations/dbms-connection/';
	properties: INodeProperties[] = [
		{
			displayName: 'Connection URI',
			name: 'uri',
			type: 'string',
			default: 'neo4j+s://xxxxxxxx.databases.neo4j.io:7687',
			required: true,
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: 'neo4j',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
            default: '',
			required: true,
		},
		{
			displayName: 'Database',
			name: 'database',
			type: 'string',
			default: 'neo4j',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Content-Type': 'application/json',
			},
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
		},
	};
/*
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.uri}}',
			url: '/',
		},
	};*/
} 