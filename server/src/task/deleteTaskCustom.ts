import { fromEvent } from 'graphcool-lib'


export default async event => {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { taskId, boardId, listId, userId } = event.data;

    const deleteTaskResp = deleteTask(api, { taskId });
    console.log('%%---> deleteTaskResp', deleteTaskResp);


    const user = await getUser(api, { userId });
    const board = await getBoard(api, { boardId });
    const list = await getList(api, { listId });

    return {
        data: {
            user: JSON.stringify(user),
            board: JSON.stringify(board),
            list: JSON.stringify(list)
        }
    }
}


async function deleteTask(api, { taskId }) {
    const mutation = `
        mutation deleteTask($id: ID!) {
            deleteTask(id: $id) {
                id
            }
        }
    `;
    const variables = {
        id: taskId
    };

    return api.request(mutation, variables);
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

