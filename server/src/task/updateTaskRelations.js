import { fromEvent } from 'graphcool-lib';
// Queries
import getTask from "../queries/getTask.query";
import getUser from "../queries/getUser.query";
import getList from "../queries/getList.query";
import getBoards from "../queries/getBoards.query";


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

	const task = await getTask(api, { taskId: event.data.id });

    response.push(await getBoards(api));
    response.push(await getList(api, { listId: event.data.listId }));
    response.push(await getUser(api, { authorId: event.data.authorId }));
    response.push(await getLabels(api));

    // Case when our Task was deleted, we need to delete Task on client store
	if(!task.Task) response.push({ deleteTaskCustom: { id: event.data.id }});

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
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
    return api.request(query);
}
