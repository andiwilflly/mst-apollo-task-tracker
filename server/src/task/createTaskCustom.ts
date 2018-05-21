import { fromEvent } from 'graphcool-lib'


export default async event => {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');
    const { title, description, boardId, authorId, listId } = event.data;

    const { createTask:createTaskResponse } = await newTask(api, { title, description, boardId, authorId, listId });
    const { User } = await getUser(api, { authorId });
    const { Board } = await getBoard(api, { boardId });
    const { List } = await getList(api, { listId });

    return {
        data: {
            task: JSON.stringify(createTaskResponse),
            user: JSON.stringify(User),
            board: JSON.stringify(Board),
            list: JSON.stringify(List)
        }
    }
}


async function newTask(api, { title, description, boardId, authorId, listId }) {
    const mutation = `
        mutation createTask($title: String!, $description: String!, $boardId: ID!, $authorId: ID!, $listId: ID!) {
            createTask(title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId) {
                id
                title
                description
                author {
                    id
                }
                list {
                    id
                }
                board {
                    id
                }
            }
        }
    `;
    const variables = {
        title,
        description,
        boardId,
        authorId,
        listId
    };

    return api.request(mutation, variables);
}

async function getUser(api, { authorId }) {
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
        id: authorId
    };

    return api.request(query, variables);
}

async function getBoard(api, { boardId }) {
    const query = `
        query getBoard($id: ID!) {
            Board(id: $id) {
                id
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

