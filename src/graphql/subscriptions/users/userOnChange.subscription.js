export default function ({ userId }) {

	return JSON.stringify({
		id: `USER_UPDATED__${userId}`,
		type: 'subscription_start',
		query: `
			subscription User {
				User(filter: {
					mutation_in: [UPDATED]
					node: {
            			id: "${ userId }"
					}
				}){
					mutation	
					updatedFields
					node {
						id
						email
						avatar
						name
						phone
						lastVisit
				
						tasks {
							id
						}
						myBoards {
							id
						}
						boards {
							id
						}
						comments {
							id
						}	
						invites {
							id
							boardId
							emailInviteReceiver
							authorId
							user {
								id
							}
						}				
					}						
				}
			}
		`
	})
}