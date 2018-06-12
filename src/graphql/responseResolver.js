import Alert from 'react-s-alert';
// MobX
import { runInAction } from "mobx";
// Utils
import history from "utils/history.utils";
// Store
import store from "store";


export default function (data = {}, errors = null, cache) {

	const dataName = Object.keys(data)[0];
	data = data[dataName];
	const errorMsg = errors ? errors[0].functionError || errors[0].message : "";

	console.groupCollapsed(`%c🕺 RESOLVER [${dataName}] (${errors ? "ERROR" : "SUCCESS"})`, "color: darkgreen");
	console.log("dataName", dataName);
	console.log("data", data);
	console.log("errors", errors);
	console.groupEnd(`%c🕺 REQUEST`, "color: darkgreen");

    if(errors) return revertData(dataName, errorMsg);
	applyData(dataName, data);
}


function applyData(dataName, data) {

	switch (dataName) {

		// Users
		case "loggedInUser":
			if(!data) return;
			store.logIn(data.id); // sobaka@i.ua
			break;
		case "signupUser":
		case "authenticateUser":
			if(!data) return;
            sessionStorage.setItem('token', data.token);
            store.logIn(data.id);
            history.push(store.nextPathUrl || '/boards');
			break;

		// Users
		case "updateUser":
			if(store.users.all.has(data.id)) store.users.all.get(data.id).update(data);
			break;
		case "User":
			store.users.create(data);
			break;

		// Lists
		case "List":
			if(data) store.lists.create(data);
			break;
		case "createList":
			store.lists.create(data);
			store.lists.all.get(data.id).updateListRelations({
				boardId: store.lists.all.get(data.id).boardId
			});
			break;

		// Boards
		case "allBoards":
			data.map((board)=> store.boards.create(board));
			break;
		case "Board":
			store.boards.create(data);
			break;
		case "createBoard":
			store.boards.create(data);
			store.boards.all.get(data.id).updateBoardRelations({
				authorId: store.boards.all.get(data.id).authorId
			});
			break;
		case "deleteBoard":
			history.push('/boards');
			store.boards.all.get(data.id).updateBoardRelations({
				authorId: store.boards.all.get(data.id).authorId
			});
			store.boards.delete(data.id);
			break;

		// Tasks
		case "allTasks":
			runInAction(`TASKS-CREATE-ALL-SUCCESS`, ()=> {
				data.map((task)=> store.tasks.create(task));
			});
			break;
		case "Task":
			store.tasks.create(data);
			break;
		case "createTask":
			// Subscribed at [webSocket:TASK_CREATE]
			store.tasks.optimisticCreate({
				...data,
				authorId: data.author.id,
				boardId: data.board.id,
				listId: data.list.id,
				labelsIds: data.labels.map((label)=> label.id)
			});
			break;
		case "updateTask":
			// Optimistic updates
			const task = store.tasks.all.get(data.id);
			if(task) task.update(data);
			break;
		case "deleteTask":
			// Subscribed at [webSocket:TASK_DELETE]
			store.tasks.optimisticDelete(data.id);
			break;
		case "deleteTaskCustom":
			store.tasks.delete(data.id);
			break;

		// Comments
		case "allComments":
			runInAction(`COMMENTS-CREATE-ALL-SUCCESS`, ()=> {
				data.map((comment)=> store.comments.create(comment));
			});
			break;
		case "Comment":
		case "updateComment":
			store.comments.create(data);
			break;
        case "createComment":
            store.comments.optimisticCreate({
                ...data,
                authorId: data.author.id,
                taskId: data.task.id
            });
            break;
		case "deleteComment":
			store.comments.optimisticDelete(data.id);
            break;

		// Labels
		case "allLabels":
			runInAction('LABELS-CREATE-ALL', ()=> {
				data.forEach((label)=> store.labels.create(label));
			});
			break;
		case "Label":
			store.labels.create(data);
			break;
		case "createLabel":
			store.labels.create(data);
			break;

		case "createInviteCustom":
			data = parse(data).response;
			console.log("createInviteCustom", data);
			Alert.success("Invite was send successfully!");
			break;

		// Chats
		case "allChats":
			runInAction('CHATS-CREATE-ALL', ()=> {
				data.forEach((chat)=> store.chats.create(chat));
			});
			break;
		case "createChat":
			store.chats.create(data);
			break;
		case "ChatMsg":
			if(store.chats.all.has(data.chat.id)) store.chats.all.get(data.chat.id).createMessage(data);
			break;
		case "createChatMsg":
			console.log("createChatMsg", data);
			break;

		// Custom Functions
		case "acceptInvite":
		case "updateBoardRelations":
		case "updateListRelations":
		case "updateTaskRelations":
		case "updateTaskCustom":
		case "updateTaskCustomRelations":
        case "updateCommentCustom":
			data = parse(data).response;
			data.map((data)=> applyData(Object.keys(data)[0], data[Object.keys(data)[0]]));
			break;

		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED:`, 'color: darkred', dataName, data);
	}
}


function revertData(dataName, errorMsg) {

	Alert.error(errorMsg);
	switch (dataName) {

		case "createTask":
			store.tasks.optimisticDelete("optimisticUpdate");
			break;
		case "createComment":
			store.comments.optimisticDelete("optimisticUpdate");
			break;
		default:
	}
}



function parse(data) {
	const result = {};
    Object.keys(data).forEach(key => {
        try {
            result[key] = JSON.parse(data[key]);
        } catch (e) {
			result[key] = data[key]; // For string case
		}
    });
	return result;
}