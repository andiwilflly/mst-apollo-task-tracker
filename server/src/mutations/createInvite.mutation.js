async function createInvite(api, { authorId, userId, boardId, emailInviteReceiver }) {
    const query = `
        mutation createInvite($authorId: String!, $userId: ID!, $boardId: String!, $emailInviteReceiver: String!) {
			createInvite(authorId: $authorId, userId :$userId, boardId: $boardId, emailInviteReceiver: $emailInviteReceiver) {
				id
				authorId
				user {id}
				boardId
				emailInviteReceiver
			}
		}
    `;
    const variables = {
        authorId,
        userId,
        boardId,
        emailInviteReceiver
    };

    return api.request(query, variables);
}


export default createInvite;