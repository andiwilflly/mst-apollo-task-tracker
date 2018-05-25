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
	const errorMsg = errors ? errors[0].message : "";

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
		case "loggedInUser":
			// TESTING
			store.logIn('cjhab8inhns0g0160ivthcp3f');
			break;
		case "signupUser":
			console.log("ccs", data);
			break;
		case "authenticateUser":
			store.logIn(data.id);
			history.push(store.nextPathUrl || '/boards');
			break;
		case "User":
			store.users.create(data);
			break;
		case "Board":
			store.boards.create(data);
			break;
		case "List":
			store.lists.create(data);
			break;
		case "deleteBoard":
			history.push('/boards');
			store.board.delete(data.id);
			Alert.success("Board was deleted successfully!");
			break;

		case "Task":
			store.tasks.create(data);
			break;
		case "deleteTaskCustom":
			store.tasks.delete(data.id);
			break;

		case "updateTask":
			const task = store.tasks.all.get(data.id);
			if(task) task.update(data);
			break;

        case "updateTaskRelations":
		case "updateTaskCustom":
            data = parse(data).response;
            console.log(data, 4242);
			data.map((data)=> applyData(Object.keys(data)[0], data[Object.keys(data)[0]]));
			break;

		case "allLabels":
			runInAction('LABELS-CREATE-ALL', ()=> {
				data.forEach((label)=> store.labels.create(label));
			});
			break;
		case "Label":
			store.labels.create(data);
			break;

		default:
			console.log("dataName: ", dataName, data);
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