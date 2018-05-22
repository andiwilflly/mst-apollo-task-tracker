async function getUser(api, { authorId }) {
	const query = `
        query getUser($id: ID!) {
            User(id: $id) {
                id
                tasks {
                    id
                }
            }
        }
    `;
	const variables = {
		id: authorId
	};

	return api.request(query, variables);
}

export default getUser;