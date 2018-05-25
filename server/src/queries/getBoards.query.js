async function getBoards(api) {
	const query = `
        {
			allBoards { id }
		}
    `;
	const variables = {
	};

	return api.request(query, variables);
}


export default getBoards;