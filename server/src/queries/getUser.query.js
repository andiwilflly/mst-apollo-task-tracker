async function getUser(api, { userId }) {
	const query = `
        query getUser($id: ID!) {
            User(id: $id) {
                id
				email
				
				tasks {
					id
				}
				myBoards {
					id
				}
				boards {
					id
				}
				invites {
					boardId
					fromUser
				}
			}
		}
    `;
	const variables = {
		id: userId
	};

	return api.request(query, variables);
}

export default getUser;