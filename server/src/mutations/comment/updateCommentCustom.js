import { fromEvent } from 'graphcool-lib';
// Queries
import getTask from "../../queries/getTask.query";
import getUser from "../../queries/getUser.query";


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    let response = [];
    console.log('%%---> parameters', event.data)

    await updateComment(api, { ...event.data, changedAt: "" + Date.now() });

    response.push(await getTask(api, { taskId: event.data.taskId }));
    response.push(await getUser(api, { taskId: event.data.authorId }));

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


async function updateComment(api, comment={}) {
    const mutation = `mutation updateComment($id: ID!, $authorId: ID, $text: String, $changedAt: String) {
        updateComment(id: $id, authorId: $authorId text: $text changedAt: $changedAt) {
            id
            text
            createdAt
            task {
                id
            }
            author {
                id
            }
		}
    }`;
    const variables = comment;

    return api.request(mutation, variables);
}

