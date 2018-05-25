async function updateUser(api, { userId, boardsIds }) {
	const query = `
        mutation updateUser($id:ID!, $boardsIds: [ID!]!) {
			updateUser(id: $id, boardsIds: $boardsIds) {
				id   
			}
		}
    `;
	const variables = {
		id: userId,
		boardsIds: boardsIds
	};

	return api.request(query, variables);
}


export default updateUser;