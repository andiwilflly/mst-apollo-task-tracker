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
			const dataName = data.id.split('__')[0];

			console.log(`%c SOCKET-SUBSCRIPTION-DATA-ARRIVED [event: ${dataName}]`, styles);
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

					console.log("TASK_UPDATED!", data, task);
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
	webSocket.send(JSON.stringify({ type: 'init' }));
};


export default webSocket;