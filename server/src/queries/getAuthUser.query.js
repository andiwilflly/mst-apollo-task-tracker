async function getAuthUser(api) {
	const query = `
       query {
		  user {
		   id 
		  }
		}
    `;
	const variables = {
	};

	return api.request(query, variables);
}

export default getAuthUser;