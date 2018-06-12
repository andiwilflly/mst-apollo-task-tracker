async function deleteList(api, { listId }) {
    const mutation = `
        mutation deleteList($id: ID!) {
            deleteList(id: $id) {
                id
            }
        }
  `;

    const variables = {
        id: listId
    };

    return api.request(mutation, variables);
}


export default deleteList;