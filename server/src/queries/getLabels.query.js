async function getLabels(api) {
	const query = `
        {
			allLabels {
            	id
                tasks {
                	id
                }             
            }
		}
    `;
	const variables = {
	};

	return api.request(query, variables);
}


export default getLabels;