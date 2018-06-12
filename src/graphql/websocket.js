// Store
import store from "store";

const webSocket = new WebSocket('wss://subscriptions.graph.cool/v1/cjh1v6rdw1kmk0171da10ighp', 'graphql-subscriptions');


webSocket.onopen = (event)=> {
    webSocket.send(JSON.stringify({ type: 'init' }));
};

webSocket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	const styles = '';

	switch (data.type) {
		case 'init_success': {

			break
		}
		case 'init_fail': {
			console.log(`%c SOCKET-INIT-FAILED`, styles, data);
            break;
		}
		case 'subscription_data': {
			const dataName = data.id.split('__')[0];
			const dataId = data.id.split('__')[1];

			console.groupCollapsed(`[socket: ${dataName}-${dataId}]`);
			console.log('dataName: ', dataName);
			console.log('dataId: ', dataId);
			console.log('data: ', data);
			console.groupEnd(`[socket: ${dataName}-${dataId}]`);

            switch(dataName) {
				case 'TASK_CREATED':
					const createdTask = data.payload.data.Task.node;
					if(store.tasks.all.has(createdTask.id)) return console.log("ERROR IN TASK_CREATED");

					store.tasks.updateTaskRelations({
						id: createdTask.id,
						authorId: createdTask.author.id,
						boardId: createdTask.board.id,
						listId: createdTask.list.id
					});
					break;

				case "TASK_UPDATED":
					const taskFromEvent = data.payload.data.Task.node;
					const task = store.tasks.all.get(taskFromEvent.id);
					if(!task) return console.log("ERROR IN TASK_UPDATED");

					// TODO: Recheck this
					task.updateTaskCustomRelations({
						id: task.id,
						listId: task.list.id,
						boardId: task.board.id,
						labelsIds: task.labels.map((label)=> label.id)
					});
					break;

				case 'TASK_DELETED':
                    const deletedTask = data.payload.data.Task.previousValues;
                    const taskFromStore = store.tasks.all.get(deletedTask.id);
                    if(!taskFromStore) return console.log("ERROR IN TASK_DELETED");

                    store.tasks.updateTaskRelations({
                        id: taskFromStore.id,
                        authorId: taskFromStore.author.id,
                        boardId: taskFromStore.board.id,
                        listId: taskFromStore.list.id
                    });
                    break;

				case "USER_UPDATED":
					const updatedUser = data.payload.data.User;
					const user = store.users.all.get(updatedUser.node.id);
					if(!user) return console.log("ERROR IN USER_UPDATED");

					// TODO: Recheck this for optimistic updates, etc.
					user.update(updatedUser.node);
					break;

				case "CHAT_MSG_CREATED":
					const chatMsg = data.payload.data.ChatMsg.node;
					if(!store.chats.all.has(chatMsg.chat.id)) return console.log("ERROR IN CHAT_MSG_CREATE");
					store.chats.all.get(chatMsg.chat.id).createMessage(chatMsg);
					break;

                default:
                    console.log(`%c subscription data has been received`, 'color: darkPink', data);
                    break;
            }
			break
		}
		case 'subscription_success': {
			//console.log(`%c SOCKET-SUBSCRIPTION-SUCCESS [event: ${data.id}]`, styles);
            break
		}
		case 'subscription_fail': {
			console.log(`%c SOCKET-SUBSCRIPTION-FAILED [event: ${data.id}]`, styles);
            break;
		}
		default:
			break;
	}
};

webSocket.onclose = (event)=> {
	// TODO: Reopen
	console.log("SOCKET CLOSE", event);
};


export default webSocket;