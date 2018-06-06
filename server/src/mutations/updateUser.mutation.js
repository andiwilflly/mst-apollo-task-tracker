async function updateUser(api, variables = {}) {
    variables.trigger = "" + Math.random();
	const query = `
        mutation updateUser($id:ID!, $boardsIds: [ID!], $trigger: String!) {
			updateUser(id: $id, boardsIds: $boardsIds, trigger: $trigger) {
				id   
			}
		}
    `;

	return api.request(query, variables);
}


export default updateUser;