# n8n-nodes-neo4j

This is an n8n community node. It lets you use Neo4j in your n8n workflows using [LangChain](https://langchain.com/).

[Neo4j](https://neo4j.com/) is a graph database with vector search for knowledge graphs.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

_List the operations supported by your node._

## Credentials

To connect to your graph database, you will need your instance url (including protecol and port), your database name and a user/password.

## Compatibility

Tested against n8n 1.45.1

## Usage

Use as any other AI VectorStore node in n8n. AI Nodes are still in Beta state and are only compatible with the Docker image `docker.n8n.io/n8nio/n8n:ai-beta`.

### Node parameters
#### Operation Mode
Vector Store nodes in n8n have three modes: Get Many, Insert Documents and Retrieve Documents. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.
- Get Many
In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt will be embedded and used for similarity search. The node will return the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context.
- Insert Documents
Use insert documents mode to insert new documents into your vector database.
- Retrieve Documents (For Agent/Chain)
Use Retrieve Documents mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.

Commun paramter : Neo4j index name

Additional parameters for Get Many:
Prompt
Limit

Additional parameters for Insert Documents/Retrieve documents:
Cypher Query

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Neo4j LanchainJS documentation](https://neo4j.com/labs/genai-ecosystem/langchain/?utm_source=Google&utm_medium=PaidSearch&utm_campaign=UCGenAI&utm_content=AMS-Search-SEMCO-UCGenAI-None-SEM-SEM-NonABM&utm_term=neo4j%20ai&utm_adgroup=genai-llm&gad_source=1&gclid=CjwKCAjw1emzBhB8EiwAHwZZxeV_k7HJ0bkZyfLqozioVYpxQtNyzFMjkO1ZTXZyIXiRec_ScCLKThoC_RUQAvD_BwE)

## Version history

1.0 : first runnable version of Neo4j VectorStore node
