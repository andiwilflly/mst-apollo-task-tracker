// Store
import store from "store";

const webSocket = new WebSocket('wss://subscriptions.graph.cool/v1/cjh1v6rdw1kmk0171da10ighp', 'graphql-subscriptions');


webSocket.onopen = (event)=> {
	const message = {
		type: 'init'
	};
	webSocket.send(JSON.stringify(message));

    const taskSubscriptionMessage = {
		id: 'TASK_DELETED',
		type: 'subscription_start',
		query: `
            subscription Task {
                Task(filter: {
                    mutation_in: [DELETED]
                }){
                    mutation
                    previousValues {
                        id
                    }
                }
            }
			`
	};
	webSocket.send(JSON.stringify(taskSubscriptionMessage));
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
                    const deletedTaskId = data.payload.data.Task.previousValues.id;
                    const task = store.tasks.all.get(deletedTaskId);
                    if(!task) return;

                    const { id:taskId, authorId:userId, boardId, listId } = task;
                    store.tasks.deleteMutation({ taskId, userId, boardId, listId }).catch(console.log);
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