import { NodeOperationError, type INodeProperties } from 'n8n-workflow';
import { Neo4jVectorStore } from '@langchain/community/vectorstores/neo4j_vector';
import { createVectorStoreNode } from '../shared/createVectorStoreNode';
import { metadataFilterField } from '../../../utils/sharedFields';


const defaultQuery = 'MATCH (n) RETURN n.id as Id, n.name as Name, n.content as Content LIMIT 10'

const sharedFields: INodeProperties[] = [
	{
		displayName: 'Neo4j Index',
		name: 'neo4jIndex',
		type: 'string',
		default: 'vector'
	}
]
const insertFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [
			{
				displayName: 'Cypher Query',
				name: 'cypherQuery',
				type: 'string',
				default: defaultQuery,
				description: 'Cypher query to use for matching documents',
			},
		],
	},
];
const retrieveFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [
			{
				displayName: 'Cypher Query',
				name: 'cypherQuery',
				type: 'string',
				default: 'MATCH (n) RETURN n.id as Id, n.name as Name, n.content as Content LIMIT 10',
				description: 'Cypher query to use for matching documents',
			},
			metadataFilterField
		],
	},
];
export const VectorStoreNeo4j  = createVectorStoreNode({
	meta: {
		description: 'Work with your data in Neo4j Vector Store',
		icon: 'file:neo4j.png',
		displayName: 'Neo4j Vector Store',
		docsUrl:
			'https://github.com/Kurea/n8n-nodes-neo4j/blob/main/README.md',
		name: 'vectorStoreNeo4j',
		credentials: [
			{
				name: 'neo4j',
				required: true,
			},
		],
	},
	sharedFields,
	insertFields,
	loadFields: retrieveFields,
	retrieveFields,
	async getVectorStoreClient(context, filter, embeddings, itemIndex) {
		const indexName = context.getNodeParameter('neo4jIndex', itemIndex, 'vector', {
			extractValue: true,
		}) as string;
		const options = context.getNodeParameter('options', itemIndex, {cypherQuery:undefined}) as {
			cypherQuery: string;
		};
		const credentials = await context.getCredentials('neo4j');
		const config = {
			url: credentials.url as string, // URL for the Neo4j instance
			username: credentials.username as string, // Username for Neo4j authentication
			password: credentials.password as string, // Password for Neo4j authentication
			indexName: indexName, // Name of the vector index
			keywordIndexName: "keyword", // Name of the keyword index if using hybrid search
			searchType: "vector" as const, // Type of search (e.g., vector, hybrid)
			nodeLabel: "Chunk", // Label for the nodes in the graph
			textNodeProperty: "text", // Property of the node containing text
			embeddingNodeProperty: "embedding", // Property of the node containing embedding
			retrievalQuery: options.cypherQuery
		  };
		
		return await Neo4jVectorStore.fromExistingIndex(embeddings, config);
	},
	async populateVectorStore(context, embeddings, documents, itemIndex) {
		const indexName = context.getNodeParameter('neo4jIndex', itemIndex, 'vector', {
			extractValue: true,
		}) as string;
		const options = context.getNodeParameter('options', itemIndex, {cypherQuery:undefined}) as {
			cypherQuery: string;
		};
		const credentials = await context.getCredentials('neo4j');

		const config = {
			url: credentials.url as string, // URL for the Neo4j instance
			username: credentials.username as string, // Username for Neo4j authentication
			password: credentials.password as string, // Password for Neo4j authentication
			indexName: indexName, // Name of the vector index
			keywordIndexName: "keyword", // Name of the keyword index if using hybrid search
			searchType: "vector" as const, // Type of search (e.g., vector, hybrid)
			nodeLabel: "Chunk", // Label for the nodes in the graph
			textNodeProperty: "text", // Property of the node containing text
			embeddingNodeProperty: "embedding", // Property of the node containing embedding
			retrievalQuery: options.cypherQuery

		  };
		  		  
		try {
			await Neo4jVectorStore.fromDocuments(documents, embeddings, config);
		} catch (error) {
			throw new NodeOperationError(context.getNode(), error as Error, {
				itemIndex,
			});
		}
	},
});