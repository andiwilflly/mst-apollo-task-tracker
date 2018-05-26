async function createInvite(api, { userId, boardId, emailInviteReceiver }) {
    const query = `
        mutation createInvite($userId: ID!, $boardId: String!, $emailInviteReceiver: String!) {
			createInvite(userId :$userId, boardId: $boardId, emailInviteReceiver: $emailInviteReceiver) {
				id
				user {id}
				boardId
				emailInviteReceiver
			}
		}
    `;
    const variables = {
        userId,
        boardId,
        emailInviteReceiver
    };

    return api.request(query, variables);
}


export default createInvite;