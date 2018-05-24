// Store
import store from "store";

const webSocket = new WebSocket('wss://subscriptions.graph.cool/v1/cjh1v6rdw1kmk0171da10ighp', 'graphql-subscriptions');


webSocket.onopen = (event)=> {
	const message = {
		type: 'init'
	};
    webSocket.send(JSON.stringify(message));
};

webSocket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	switch (data.type) {
		case 'init_success': {
            console.log(`%c Subscription init success`, 'color: darkPink');
			break
		}
		case 'init_fail': {
            console.error({
				message: 'init_fail returned from WebSocket server',
				data
			});
            break;
		}
		case 'subscription_data': {
            switch(data.id) {
				case 'TASK_DELETED':
                    const deletedTask = data.payload.data.Task.previousValues;
                    const taskFromStore = store.tasks.all.get(deletedTask.id);
                    if(!taskFromStore) return;

                    store.tasks.updateTaskRelations({
						authorId: taskFromStore.author.id,
						boardId: taskFromStore.board.id,
						listId: taskFromStore.list.id
                    });
                    break;

				case 'TASK_CREATE':
                    const createdTask = data.payload.data.Task.node;
                    if(store.tasks.all.has(createdTask.id)) return;

                    store.tasks.updateTaskRelations({
						authorId: createdTask.author.id,
						boardId: createdTask.board.id,
						listId: createdTask.list.id });
					break;

                default:
                    console.log(`%c subscription data has been received`, 'color: darkPink', data);
                    break;
            }
			break
		}
		case 'subscription_success': {
            console.log(`%c Subscription success`, 'color: darkPink');
            break
		}
		case 'subscription_fail': {
            console.error({
                message: 'subscription_fail returned from WebSocket server',
                data
            });
            break;
		}
		default:
			break;
	}
};

webSocket.onclose = (event)=> {
	console.log("SOCKET CLOSE", event);
};


export default webSocket;