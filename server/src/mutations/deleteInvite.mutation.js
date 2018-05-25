async function deleteInvite(api, { inviteId }) {
	const query = `
        mutation deleteInvite($id:ID!) {
			deleteInvite(id: $id) {
				id   
			}
		}
    `;
	const variables = {
		id: inviteId,
	};

	return api.request(query, variables);
}


export default deleteInvite;