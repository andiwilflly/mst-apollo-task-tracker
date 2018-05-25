async function getTask(api, { taskId }) {
	const query = `
        query getTask($id: ID!) {
            Task(id: $id) {
                id
				title
				description
				author {
					id
				}
				board { 
					id
				}
				list {
					id
				}
				labels {
					id
				}
			}
		}
    `;
	const variables = {
		id: taskId
	};

	return api.request(query, variables);
}


export default getTask;