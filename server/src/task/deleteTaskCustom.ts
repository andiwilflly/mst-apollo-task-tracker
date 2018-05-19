import { fromEvent } from 'graphcool-lib'


export default async event => {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { taskId, boardId, listId, userId } = event.data;

    const board = await getBoard(api, { taskId, boardId, listId, userId });

    // const user = await getUsers(client);
    // const list = await getLists(client);

    return {
        data: {
            board: JSON.stringify(board)
        }
    }
}


async function getBoard(api, { taskId, boardId, listId, userId }) {
    const query = `
        query getBoard($id: ID!) {
          Board(id: $id) {
            id
            name
            description
            lists {
                id
            }
            tasks {
                id
            }
          }
        }
  `;

    const variables = {
        id: boardId
    };

    return api.request(query, variables)
}

// async function getLists(client) {
//     const query = `
//         query allBoards() {
//             id
//         }
//   `;
//     return client.request(query)
// }
//
// async function getUsers(client) {
//     const query = `
//         query allUsers() {
//             id
//         }
//   `;
//     return client.request(query)
// }