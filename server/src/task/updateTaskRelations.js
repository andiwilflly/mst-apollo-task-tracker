import { fromEvent } from 'graphcool-lib';
// Queries
import getUser from "../queries/getUser.query";
import getList from "../queries/getList.query";
import getBoard from "../queries/getBoard.query";


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    response.push(await getBoard(api, { boardId: event.data.boardId }));
    response.push(await getList(api, { listId: event.data.listId }));
    response.push(await getUser(api, { authorId: event.data.authorId }));
    response.push(await getLabels(api));

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
