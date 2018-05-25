import { fromEvent } from 'graphcool-lib';
// Queries
import getUser from "../queries/getUser.query";
import updateUser from "../mutations/updateUser.mutation";


export default async (event)=> {

	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const response = [];

	response.push({ deleteInvite: { id: event.data.inviteId } });

	await updateUser(api, {
		userId: event.data.userId,
		boardsIds: [...event.data.boardsIds, event.data.inviteBoardId]
	});

	response.push(await getUser(api, { userId: event.data.userId }));

	return {
		data: {
			response: JSON.stringify(response)
		}
	}
}


a = `mutation ($id:ID!, $users: [String!]!) {
    updateBoard(id: $id, users: $users) {
        id     
    }
}`;