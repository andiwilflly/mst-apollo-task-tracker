// Store
import store from "store";

const webSocket = new WebSocket('wss://subscriptions.graph.cool/v1/cjh1v6rdw1kmk0171da10ighp', 'graphql-subscriptions');


webSocket.onopen = (event)=> {
    webSocket.send(JSON.stringify({ type: 'init' }));
};

webSocket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	const styles = 'color: white; background: #82afdc; padding: 2px';

	switch (data.type) {
		case 'init_success': {
            console.log(`%c SOCKET-INIT-SUCCESS`, styles);
			break
		}
		case 'init_fail': {
			console.log(`%c SOCKET-INIT-FAILED`, styles, data);
            break;
		}
		case 'subscription_data': {
			console.log(`%c SOCKET-SUBSCRIPTION-DATA-ARRIVED [event: ${data.id}]`, styles, data);
            switch(data.id) {
				case 'TASK_DELETED':
					console.log("1====>", data.payload.data);
                    const deletedTask = data.payload.data.Task.previousValues;
                    const taskFromStore = store.tasks.all.get(deletedTask.id);
                    console.log("2====>", taskFromStore);
                    if(!taskFromStore) return;

                    console.log("==> 3");
                    store.tasks.updateTaskRelations({
						id: taskFromStore.id,
						authorId: taskFromStore.author.id,
						boardId: taskFromStore.board.id,
						listId: taskFromStore.list.id
                    });
                    break;

				case 'TASK_CREATE':
                    const createdTask = data.payload.data.Task.node;
                    if(store.tasks.all.has(createdTask.id)) return;

                    store.tasks.updateTaskRelations({
						id: createdTask.id,
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
			console.log(`%c SOCKET-SUBSCRIPTION-SUCCESS [event: ${data.id}]`, styles);
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
	console.log("SOCKET CLOSE", event);
};


export default webSocket;