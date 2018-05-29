import { fromEvent } from 'graphcool-lib';
// Queries
import getUser from "../queries/getUser.query";


export default async (event)=> {

	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const response = [];

	response.push(await getUser(api, { userId: event.data.authorId }));

	return {
		data: {
			response: JSON.stringify(response)
		}
	}
}
