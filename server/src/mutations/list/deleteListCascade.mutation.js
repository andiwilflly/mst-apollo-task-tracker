async function deleteListCascade(api, { listId }) {
    const mutation = `
        mutation deleteListCascade($taskId: ID!) {
            deleteListCascade(taskId: $taskId) {
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