import Alert from 'react-s-alert';
// MobX
import { runInAction } from "mobx";
// Utils
import history from "utils/history.utils";
// Store
import store from "store";


export default function (operation = {}, data = {}, errors = null, cache) {

	const dataName = Object.keys(data)[0];
	data = data[dataName];
	const errorMsg = errors ? errors[0].functionError || errors[0].massege : "";

	console.groupCollapsed(`%c🕺 REQUEST (${errors ? "ERROR" : "SUCCESS"})`, "color: darkgreen");
	console.log("dataName", dataName);
	console.log("data", data);
	console.log("errors", errors);
	console.groupEnd(`%c🕺 REQUEST`, "color: darkgreen");

    if(errors) return Alert.error(errorMsg);
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
            localStorage.setItem('token', data.token);
            store.logIn(data.id);
            history.push(store.nextPathUrl || '/boards');
			break;
		case "User":
			store.users.create(data);
			break;

		// Lists
		case "List":
			store.lists.create(data);
			break;
		case "createList":
			store.lists.create(data);
			store.lists.all.get(data.id).updateListRelations({
				id: data.id,
				boardId: store.lists.all.get(data.id).boardId
			});
			break;

		// Boards
		case "Board":
			store.boards.create(data);
			break;
		case "deleteBoard":
			history.push('/boards');
			store.board.delete(data.id);
			Alert.success("Board was deleted successfully!");
			break;

		// Tasks
		case "Task":
			store.tasks.create(data);
			break;
		case "updateTask":
			const task = store.tasks.all.get(data.id);
			if(task) task.update(data);
			break;
		case "deleteTaskCustom":
			store.tasks.delete(data.id);
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

		// Custom Functions
		case "acceptInvite":
		case "updateListRelations":
		case "updateTaskRelations":
		case "updateTaskCustom":
			data = parse(data).response;
			console.log(data, 42);

			data.map((data)=> applyData(Object.keys(data)[0], data[Object.keys(data)[0]]));
			break;

		default:
			console.log("UNHANDLED: dataName: ", dataName, data);
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