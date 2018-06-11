import { fromEvent } from 'graphcool-lib';
// Queries
import getTask from "../../queries/getTask.query";
import getUser from "../../queries/getUser.query";


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');
    const { id, authorId, taskId, text } = event.data;

    let response = [];

    await updateComment(api, { ...{ id, authorId, text }, changedAt: "" + Date.now() });

    response.push(await getTask(api, { taskId }));
    // response.push(await getUser(api, { id: authorId }));

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


async function updateComment(api, comment={}) {
    const mutation = `mutation updateComment($id: ID!, $text: String, $changedAt: String) {
        updateComment(id: $id, text: $text, changedAt: $changedAt) {
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

