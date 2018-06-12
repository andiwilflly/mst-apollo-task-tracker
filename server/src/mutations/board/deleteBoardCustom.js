import { fromEvent } from 'graphcool-lib';
// Queries
// Mutations
import deleteListsCustom from '../list/deleteListsCustom';


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];
    const { boardId } = event.data;

    // await deleteListsCustom(api, { boardId: event.data.boardId });

    const deleteListsCustom = `${boardId}: deleteListsCustom(boardId: "${boardId}") { id }`;

    const mutation = `mutation {
        ${deleteListsCustom}
    }`;

    response.push(await api.request(mutation));

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}
