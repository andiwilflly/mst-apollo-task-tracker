// Store
import store from "store";


export default function (operation = {}, data = {}) {

	const operationName = operation.operationName;
	
	const dataName = Object.keys(data)[0];
	data = data[dataName];
	const errors = null;

	console.groupCollapsed(`%c🕺 REQUEST ${operationName}`, "color: darkgreen");
	console.log("operationName", operationName);
	console.log("dataName", dataName);
	console.log("data", data);
	console.groupEnd(`%c🕺 REQUEST`, "color: darkgreen");

	switch (dataName) {
		case "loggedInUser":
			// TESTING
			store.loginUser('cjhab8inhns0g0160ivthcp3f');
			break;
		case "authenticateUser":
			errors ?
				console.log(`%c [${dataName}] ${errors[0].message}`, "color: red")
				:
				store.loginUser(data.id);
			break;
		case "User":
			store.user.setInfo(data);
			break;
		case "Board":
			store.user.updateBoard(data);
			break;
        case "Task":
            store.user.boards.get(data.board.id).updateTask(data);
            break;
		default:
			// console.log("dataName: ", operationName, dataName, data);
	}
}