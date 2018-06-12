import { fromEvent } from 'graphcool-lib';
// Queries
import getList from '../../queries/getList.query';
// Mutations
import deleteTaskCascade from '../task/deleteTaskCascade.mutation';
import deleteList from './deleteList.mutation';


export default async (event)=> {
    console.log('%%---> event', event)

    const graphcool = fromEvent(event);
    console.log('%%---> graphcool', graphcool)
    const api = graphcool.api('simple/v1');

    const response = [];

    const { List } = await getList(api, { listId: event.data.listId });

    if(List.tasks.length) {
        response.push({ tasksDeleted: List.tasks.length });

        for(let task of List.tasks) {
            await deleteTaskCascade(api, { taskId: task.id });
        }
    }

    await deleteList(api, { listId: event.data.listId });


    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


