// Apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http'


export default async event => {

    const client = new ApolloClient({
        link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjh1v6rdw1kmk0171da10ighp' }),
        cache: new InMemoryCache()
    });


    const users = await getUsers(client);
    const boards = await getBoards(client);
    const lists = await getLists(client);

    return {
        data: {
            users,
            boards,
            lists
        }
    }
}


async function getBoards(client) {
    const query = `
        query allBoards() {
            id
        }
  `;
    return client.request(query)
}

async function getLists(client) {
    const query = `
        query allBoards() {
            id
        }
  `;
    return client.request(query)
}

async function getUsers(client) {
    const query = `
        query allUsers() {
            id
        }
  `;
    return client.request(query)
}