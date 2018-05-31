async function getUser(api, { userId }) {
	const query = `
        query getUser($id: ID!) {
            User(id: $id) {
				id
				email
				avatar
		
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
					emailInviteReceiver
					authorId
					user {
						id
					}
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