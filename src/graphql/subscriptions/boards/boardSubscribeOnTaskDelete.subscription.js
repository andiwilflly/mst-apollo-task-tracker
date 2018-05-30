export default function ({ boardId }) {

	return JSON.stringify({
		id: `TASK_DELETED__${boardId}`,
		type: 'subscription_start',
		query: `
			subscription Task {
				Task(filter: {
					mutation_in: [DELETED]
					node: {
						board: {
							id: "${boardId}"
						}
					}
				}){
					mutation
					previousValues {
						id												
					}
				}
			}
		`
	})
}