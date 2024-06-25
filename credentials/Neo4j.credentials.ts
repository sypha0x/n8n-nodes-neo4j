import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric
} from 'n8n-workflow';


export class Neo4j implements ICredentialType {
	name = 'neo4j';
	displayName = 'Neo4j';
	documentationUrl = 'https://neo4j.com/docs/browser-manual/current/operations/dbms-connection/';
	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: 'neo4j',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Database',
			name: 'database',
			type: 'string',
			default: 'neo4j',
		},
		{
			displayName: 'Url',
			name: 'url',
			type: 'string',
			default: 'neo4j+s://xxxxxxxx.databases.neo4j.io:7687',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
		},
	};
}
