// Apollo
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';
// GraphQL
import responseResolver from "graphql/responseResolver";
import 'graphql/websocket';


const cache = new InMemoryCache();
const responseResolverLink = new ApolloLink((operation, forward)=> {
	return forward(operation).map((data, b , c)=> {
		responseResolver(operation, data.data, data.errors, cache);
		return data;
	})
});


const httpLink = new BatchHttpLink({
	uri: 'https://api.graph.cool/simple/v1/cjh1v6rdw1kmk0171da10ighp',
	batchInterval: 200,
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
	cache: cache
});

export default client;