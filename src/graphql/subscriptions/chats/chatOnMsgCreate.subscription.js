export default function ({ chatId }) {

	return JSON.stringify({
		id: `CHAT_MSG_CREATED__${chatId}`,
		type: 'subscription_start',
		query: `
			subscription ChatMsg {
				ChatMsg(filter: {
				mutation_in:[CREATED]
				node: {
				  	chat: {
						id: "${ chatId }"
				  	}
				}
				}) {
				node {
					id
						text
						createdAt
						authorId
						chat {
							id
						}
					}
				}
			}
		`
	})
}