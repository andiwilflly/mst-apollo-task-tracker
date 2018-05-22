import { fromEvent } from 'graphcool-lib';
// Queries
import getTask from "../queries/getTask.query";
import getList from "../queries/getList.query";
import getBoard from "../queries/getBoard.query";


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const task = await getTask(api, { taskId: event.data.id });

    let response = [];
    await updateTask(api, event.data);

	// Put updated [task] to [response]
	response.push(await getTask(api, { taskId: event.data.id }));

    // Here we change [relation] of task [list]
    // In this case we need to refetch both of lists (previous and new one)
    if(event.data.listId) {
        response.push(await getList(api, { listId: task.Task.list.id }));
		response.push(await getList(api, { listId: event.data.listId }));
    }

	if(event.data.boardId) {
		response.push(await getBoard(api, { boardId: task.Task.board.id }));
		response.push(await getBoard(api, { boardId: event.data.boardId }));
	}

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


async function updateTask(api, task={}) {
    const mutation = `mutation updateTask($id: ID!, $title: String, $description: String, $boardId: ID, $authorId: ID, $listId: ID) {
        updateTask(id: $id, title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId)
        {
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
    }`;
    const variables = task;

    return api.request(mutation, variables);
}

