import { fromEvent } from 'graphcool-lib';
// Queries
import getBoard from '../../queries/getBoard.query';
// Mutations
import deleteListCascadeMutation from '../list/deleteListCascade.mutation';
import deleteBoard from './deleteBoard.mutation';


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    const { Board } = await getBoard(api, { boardId: event.data.boardId });

    if(Board.lists.length) {
        response.push({ listsDeleted: Board.lists.length });

        for(let list of Board.lists) {
            await deleteListCascadeMutation(api, { listId: list.id });
        }
    }

    await deleteBoard(api, { boardId: event.data.boardId });


    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}
