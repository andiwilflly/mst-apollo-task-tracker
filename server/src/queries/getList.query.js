async function getList(api, { listId }) {
	const query = `
        query getList($id: ID!) {
            List(id: $id) {
                id
				name
				tasks {
					id
				}
				board {
					id
				}
			}
		}
    `;
	const variables = {
		id: listId
	};

	return api.request(query, variables);
}


export default getList;