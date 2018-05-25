async function updateBoard(api, { boardId, usersIds }) {
	const query = `
        mutation updateBoard($id:ID!, $users: [String!]!) {
			updateBoard(id: $id, users: $users) {
				id     
			}
		}
    `;
	const variables = {
		id: boardId,
		usersIds: usersIds
	};

	return api.request(query, variables);
}


export default updateBoard;