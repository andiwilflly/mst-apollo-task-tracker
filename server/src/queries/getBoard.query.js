async function getBoard(api, { boardId }) {
    const query = `
        query getBoard($id: ID!) {
            Board(id: $id) {
                id
                name
                description
                background
                author {
                    id
                }
                users {
                    id
                }
                lists {
                    id
                }
                tasks {
                    id
                }
			}
		}
    `;
    const variables = {
        id: boardId
    };

    return api.request(query, variables);
}


export default getBoard;