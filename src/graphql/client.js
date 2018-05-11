// Apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';


const link = new BatchHttpLink({
	uri: 'https://api.graph.cool/simple/v1/cjh1v6rdw1kmk0171da10ighp',
	batchInterval: 1000,
	fetch: async (url, request)=> {
		return window
			.fetch(url, request)
			.then(response => response.json())
			.then(response => {
				console.log(response, 42)
			})
	},
	batchKey: str => {
		console.log(str, '????');
		return str.operationName
	}
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
});

export default client;