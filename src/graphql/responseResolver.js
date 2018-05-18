// Utils
import history from "utils/history.utils";
// Store
import store from "store";


export default function (operation = {}, data = {}, errors = null, cache) {

	const operationName = operation.operationName;

	const dataName = Object.keys(data)[0];
	data = data[dataName];
	const errorMsg = errors ? errors[0].message : "";

	console.groupCollapsed(`%c🕺 REQUEST ${operationName} (${errors ? "ERROR" : "SUCCESS"})`, "color: darkgreen");
	console.log("operationName", operationName);
	console.log("dataName", dataName);
	console.log("data", data);
	console.log("errors", errors);
	console.groupEnd(`%c🕺 REQUEST`, "color: darkgreen");

    if(errors) return console.log(errorMsg);

	switch (dataName) {
		case "loggedInUser":
			// TESTING
			store.logIn('cjhab8inhns0g0160ivthcp3f');
			break;
		case "authenticateUser":
			store.logIn(data.id);
			history.push(store.nextPathUrl || '/boards');
			break;
		case "User":
			store.user.setInfo(data);
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
			break;
        case "Task":
            store.tasks.create(data);
            break;
		case "createTask":
			store.tasks.create(data);
			break;
		case "deleteTask":
			console.log(cache, 'delete');
			history.push('/boards');
			store.tasks.delete(data.id);
			break;
		default:
			console.log("dataName: ", operationName, dataName, data);
	}
}