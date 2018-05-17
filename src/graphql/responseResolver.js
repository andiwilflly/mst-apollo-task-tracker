// Utils
import history from "utils/history.utils";
// Store
import store from "store";


export default function (operation = {}, data = {}, errors = null) {

	const operationName = operation.operationName;

	const dataName = Object.keys(data)[0];
	data = data[dataName];
	const errorMsg = errors ? errors[0].message : "";

	console.groupCollapsed(`%c🕺 REQUEST ${operationName}`, "color: darkgreen");
	console.log("operationName", operationName);
	console.log("dataName", dataName);
	console.log("data", data);
	console.groupEnd(`%c🕺 REQUEST`, "color: darkgreen");

	switch (dataName) {
		case "loggedInUser":
			// TESTING
			store.logIn('cjhab8inhns0g0160ivthcp3f');
			break;
		case "authenticateUser":
			store.logIn(data.id);
			break;
		case "User":
			store.user.setInfo(data);
			history.push(store.nextPathUrl || '/boards');
			break;
		case "Board":
			store.boards.create(data);
			break;
		case "deleteBoard":
			if(errors) return console.log(errorMsg);
			history.push('/boards');
			store.board.delete(data.id);
			break;
        case "Task":
        	store.tasks.create(data);
            break;
		default:
			console.log("dataName: ", operationName, dataName, data);
	}
}