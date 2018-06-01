import { fromEvent } from 'graphcool-lib';
// Queries
import getUser from "../queries/getUser.query";
import updateUser from "../mutations/updateUser.mutation";
import deleteInvite from "../mutations/deleteInvite.mutation";


export default async (event)=> {

	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const response = [];

	await deleteInvite(api, { inviteId: event.data.inviteId });

	await updateUser(api, {
		userId: event.data.userId,
		boardsIds: event.data.boardsIds
	});

	response.push(await getUser(api, { userId: event.data.userId }));

	return {
		data: {
			response: JSON.stringify(response)
		}
	}
}
