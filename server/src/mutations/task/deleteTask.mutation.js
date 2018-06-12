async function deleteTask(api, { taskId }) {
    const mutation = `
        mutation deleteTask($id: ID!) {
            deleteTask(id: $id) {
                id
            }
        }
  `;

    const variables = {
        id: taskId
    };

    return api.request(mutation, variables);
}


export default deleteTask;