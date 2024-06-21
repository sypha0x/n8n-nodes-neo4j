/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'n8n-workflow';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';
import { logWrapper } from '../../../utils/logWrapper';
import { getConnectionHintNoticeField } from '../../../utils/sharedFields';

export class EmbeddingsHuggingFaceTransformers implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Embeddings Hugging Face Transformers',
		name: 'embeddingsHuggingFaceTransformers',
		icon: 'file:huggingface.svg',
		group: ['transform'],
		version: 1,
		description: 'Use HuggingFace Transformers Embeddings',
		defaults: {
			name: 'Embeddings HuggingFace Transformers',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Embeddings'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference/',
					},
				],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiEmbedding],
		outputNames: ['Embeddings'],
		properties: [
			getConnectionHintNoticeField([NodeConnectionType.AiVectorStore]),
			{
				displayName:
					'Each model is using different dimensional density for embeddings. Please make sure to use the same dimensionality for your vector store. The default model is using 384-dimensional embeddings.',
				name: 'notice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Model Name',
				name: 'modelName',
				type: 'string',
				default: 'Xenova/all-MiniLM-L6-v2',
				description: 'The model name to use from HuggingFace Transformers library',
			},
		],
	};

	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		this.logger.verbose('Supply data for embeddings HF Transformers');
		const model = this.getNodeParameter(
			'modelName',
			itemIndex,
			'Xenova/all-MiniLM-L6-v2',
		) as string;

		const embeddings = new HuggingFaceTransformersEmbeddings({
			model: model
		});

		return {
			response: logWrapper(embeddings, this),
		};
	}
}