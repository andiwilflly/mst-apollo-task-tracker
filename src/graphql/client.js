// Apollo
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';
// GraphQL
import responseResolver from "graphql/responseResolver";


const responseResolverLink = new ApolloLink((operation, forward)=> {
	return forward(operation).map((data)=> {
		responseResolver(operation, data.data);
		return data;
	})
});


const httpLink = new BatchHttpLink({
	uri: 'https://api.graph.cool/simple/v1/cjh1v6rdw1kmk0171da10ighp',
	batchInterval: 200,
	// fetch: async (url, request)=> {
	// 	return window
	// 		.fetch(url, request)
	// 		.then(response => response.json())
	// 		.then(response => {
	// 			responseResolver(response, JSON.parse(request.body));
	// 		});
	// },
	batchKey: str => {
		return str.operationName;
	}
});




const link = ApolloLink.from([
	responseResolverLink,
	httpLink
]);


const client = new ApolloClient({
	link: link,
	cache: new InMemoryCache()
});

export default client;