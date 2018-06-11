import { fromEvent } from 'graphcool-lib';
// Queries
import updateUser from "../updateUser.mutation";
import deleteInvite from "../deleteInvite.mutation";


export default async (event)=> {

	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const response = [];

	await deleteInvite(api, { inviteId: event.data.inviteId });

	response.push(await updateUser(api, {
		id: event.data.userId,
		boardsIds: event.data.boardsIds
	}));

	return {
		data: {
			response: JSON.stringify(response)
		}
	}
}
