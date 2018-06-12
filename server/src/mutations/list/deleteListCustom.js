import { fromEvent } from 'graphcool-lib';
// Queries
import getList from '../../queries/getList.query';


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    const { List } = await getList(api, { boardId: event.data.boardId });

    List.tasks.forEach(async (task)=> {
        await deleteTaskCustom(api, { taskId: task.id });
    });

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


async function deleteTaskCustom(api, { taskId }) {
    const mutation = `
        mutation deleteTaskCustom($taskId: ID!) {
            deleteTaskCustom(taskId: $taskId) {
                response
            }
        }
  `;

    const variables = {
        taskId,
    };

    return api.request(mutation, variables);
}