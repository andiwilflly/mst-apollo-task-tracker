import { fromEvent } from 'graphcool-lib';
// Queries
import getTask from '../../queries/getTask.query';
// Mutations
import deleteComment from '../comment/deleteComment.mutation'


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    const { Task } = await getTask(api, { taskId: event.data.taskId });

    response.push({ comments: Task.comments.length });

    Task.comments.forEach(async (comment)=> {
        await deleteComment(api, { commentId: comment.id });
    });


    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


