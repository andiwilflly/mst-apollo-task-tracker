async function deleteBoard(api, { boardId }) {
    const mutation = `
        mutation deleteBoard($id: ID!) {
            deleteBoard(id: $id) {
                id
            }
        }
  `;

    const variables = {
        id: boardId
    };

    return api.request(mutation, variables);
}


export default deleteBoard;