// Apollo
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';

link = "";

const client = new ApolloClient({
	link: link,
	cache: cache
});


export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  await new Promise(r => setTimeout(r, 50))

  return {
    data: {
      message: `Hello ${event.data.name || 'World'}`
    }
  }
}