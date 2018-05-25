import { fromEvent } from 'graphcool-lib';
// Queries
import getBoard from "../queries/getBoard.query";


export default async (event)=> {

	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const response = [];

	response.push(await getBoard(api, { boardId: event.data.boardId }));

	return {
		data: {
			response: JSON.stringify(response)
		}
	}
}
