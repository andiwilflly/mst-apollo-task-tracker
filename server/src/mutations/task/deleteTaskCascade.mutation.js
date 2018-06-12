async function deleteTaskCascade(api, { taskId }) {
    const mutation = `
        mutation deleteTaskCascade($taskId: ID!) {
            deleteTaskCascade(taskId: $taskId) {
                response
            }
        }
  `;

    const variables = {
        taskId,
    };

    return api.request(mutation, variables);
}


export default deleteTaskCascade;