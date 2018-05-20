import { fromEvent } from 'graphcool-lib'


export default async event => {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { taskId, boardId, listId, userId } = event.data;

    const deletedTaskId = await delTask(api, { taskId });

    const { User } = await getUser(api, { userId });
    const { Board } = await getBoard(api, { boardId });
    const { List } = await getList(api, { listId });

    return {
        data: {
            deletedTaskId: deletedTaskId,
            user: JSON.stringify(User),
            board: JSON.stringify(Board),
            list: JSON.stringify(List)
        }
    }
}


async function delTask(api, { taskId }) {
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

    return api.request(mutation, variables).then(r => r.deleteTask.id);
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
                id
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

