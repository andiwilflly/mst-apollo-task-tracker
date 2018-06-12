async function deleteListCascade(api, { listId }) {
    const mutation = `
        mutation deleteListCascade($listId: ID!) {
            deleteListCascade(listId: $listId) {
                response
            }
        }
  `;

    const variables = {
        listId
    };

    return api.request(mutation, variables);
}


export default deleteListCascade;