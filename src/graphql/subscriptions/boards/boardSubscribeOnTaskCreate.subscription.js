export default function ({ boardId }) {

	return JSON.stringify({
		id: `TASK_CREATED__${boardId}`,
		type: 'subscription_start',
		query: `
			subscription Task {
				Task(filter: {
					mutation_in: [CREATED]
					node: {
						board: {
							id: "${boardId}"
						}
					}
				}){
					mutation				
					node {
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
			}
		`
	})
}