// Store
import store from "store";

const webSocket = new WebSocket('wss://subscriptions.graph.cool/v1/cjh1v6rdw1kmk0171da10ighp', 'graphql-subscriptions');


webSocket.onopen = (event)=> {


    webSocket.send(JSON.stringify({ type: 'init' }));

    const taskDeleteSubscriptionMessage = {
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
	webSocket.send(JSON.stringify(taskDeleteSubscriptionMessage));
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
                    const deletedTaskId = data.payload.data.Task.previousValues.id;
                    const task = store.tasks.all.get(deletedTaskId);
                    if(!task) return;

                    const { id:taskId, authorId:userId, boardId, listId } = task;
                    // TODO: write [updateTaskRelations] function on server
                   // store.tasks.deleteMutation({ taskId, userId, boardId, listId }).catch(console.log);
                    break;

				case 'TASK_CREATE':
					console.log('%%---> data', data)

                    const { id:createdTaskId, title, description, author, board, list, labels } = data.payload.data.Task.node;
                    const createdTask = store.tasks.all.get(createdTaskId);
                    if(createdTask) return;
                    // console.log('%%---> ', createdTaskId, title, description, author, board, list, labels)
                   // store.tasks.createMutation({ title, description, authorId: author.id, boardId: board.id, listId:list.id, labelsIds: labels.map(label => label.id) });
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