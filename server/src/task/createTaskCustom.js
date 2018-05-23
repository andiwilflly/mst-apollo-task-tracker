import { fromEvent } from 'graphcool-lib'


export default async event => {


    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');
    const { title, description, boardId, authorId, listId, labelsIds } = event.data;

    const { createTask:createTaskResponse } = await newTask(api, { title, description, boardId, authorId, listId, labelsIds });
    const { User } = await getUser(api, { authorId });
    const { Board } = await getBoard(api, { boardId });
    const { List } = await getList(api, { listId });
    const { allLabels } = await getLabels(api);

    return {
        data: {
            task: JSON.stringify(createTaskResponse),
            user: JSON.stringify(User),
            board: JSON.stringify(Board),
            list: JSON.stringify(List),
			labels: JSON.stringify(allLabels)
        }
    }
}


async function newTask(api, { title, description, boardId, authorId, listId, labelsIds }) {
    const mutation = `
        mutation createTask($title: String!, $description: String!, $boardId: ID!, $authorId: ID!, $listId: ID!, $labelsIds:[ID!]!) {
            createTask(title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId labelsIds: $labelsIds) {
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
                labels {
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
        listId,
		labelsIds
    };

    return api.request(mutation, variables);
}

async function getLabels(api) {
	const query = `
        query allLabels {
            allLabels {
            	id
                tasks { 
                	id
                }             
            }
        }
    `;
	const variables = {
	};

	return api.request(query, variables);
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

