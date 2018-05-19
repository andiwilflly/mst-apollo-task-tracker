import { fromEvent } from 'graphcool-lib'


export default async event => {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { taskId, boardId, listId, userId } = event.data;

    const user = await getUser(api, { userId });
    const board = await getBoard(api, { boardId });
    const list = await getList(api, { listId });

    return {
        data: {
            board: JSON.stringify(board),
            user: JSON.stringify(user),
            list: JSON.stringify(list)
        }
    }
}


async function getBoard(api, { boardId }) {
    const query = `
        query getBoard($id: ID!) {
            Board(id: $id) {
                id
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

    return api.request(query, variables);
}

async function getUser(api, { userId }) {
    const query = `
        query getUser($id: ID!) {
            User(id: $id) {
                id
                tasks {
                    id
                }
            }
        }
    `;
    const variables = {
        id: userId
    };

    return api.request(query, variables);
}

async function getList(api, { listId }) {
    const query = `
        query getList($id: ID!) {
            List(id: $id) {
                tasks {
                    id
                }
            }
        }
    `;
    const variables = {
        id: listId
    };

    return api.request(query, variables);
}

