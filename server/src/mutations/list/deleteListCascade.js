import { fromEvent } from 'graphcool-lib';
// Queries
import getList from '../../queries/getList.query';
// Mutations
import deleteTaskCascade from '../task/deleteTaskCascade.mutation'
import deleteList from './deleteList.mutation';


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    const { List } = await getList(api, { listId: event.data.listId });

    response.push({ tasks: List.tasks.length });

    List.tasks.forEach(async (task)=> {
        await deleteTaskCascade(api, { taskId: task.id });
    });

    await deleteList(api, { listId: event.data.listId });


    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


