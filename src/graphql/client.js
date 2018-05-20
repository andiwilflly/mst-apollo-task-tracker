// Apollo
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';
// GraphQL
import responseResolver from "graphql/responseResolver";

//
// let webSocket = new WebSocket('wss://subscriptions.graph.cool/v1/cjh1v6rdw1kmk0171da10ighp', 'graphql-subscriptions');
//
//
// webSocket.onopen = (event)=> {
// 	const message = {
// 		type: 'init'
// 	};
// 	webSocket.send(JSON.stringify(message));
//
//
// 	const message2 = {
// 		id: '1',
// 		type: 'subscription_start',
// 		query: `
// 			subscription User {
// 			  User(filter: {
// 					mutation_in: [CREATED, UPDATED, DELETED]
// 				  }){
// 				mutation
// 				updatedFields
// 				previousValues {
// 					id
// 				}
// 				node {
// 				  id
// 				  tasks { id }
// 				  boards { id }
// 				}
// 			  }
// 			}
//   		`
// 	};
// 	webSocket.send(JSON.stringify(message2));
//
//
// 	const message3 = {
// 		id: '2',
// 		type: 'subscription_start',
// 		query: `
// 			subscription Task {
// 				  Task(filter: {
// 						mutation_in: [CREATED, UPDATED, DELETED]
// 					  }){
// 					mutation
// 					updatedFields
// 					previousValues {
// 						id
// 					}
// 					node {
// 						id
// 					}
// 				  }
// 				}
// 			`
// 	};
// 	webSocket.send(JSON.stringify(message3));
// };
//
// webSocket.onmessage = (event) => {
// 	const data = JSON.parse(event.data);
// 	switch (data.type) {
// 		case 'init_success': {
// 			console.log('init_success, the handshake is complete')
// 			break
// 		}
// 		case 'init_fail': {
//             console.error({
// 				message: 'init_fail returned from WebSocket server',
// 				data
// 			});
//             break;
// 		}
// 		case 'subscription_data': {
// 			console.log('subscription data has been received', data)
// 			break
// 		}
// 		case 'subscription_success': {
// 			console.log('subscription_success')
// 			break
// 		}
// 		case 'subscription_fail': {
//             console.error({
//                 message: 'subscription_fail returned from WebSocket server',
//                 data
//             });
//             break;
// 		}
// 		default:
// 			break;
// 	}
// };
//
// webSocket.onclose = (event)=> {
// 	console.log("SOCKET CLOSE", event);
// };


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