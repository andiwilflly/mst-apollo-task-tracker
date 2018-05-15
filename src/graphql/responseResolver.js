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
			// console.log("loggedIn user!!!", data);
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
		default:
			//console.log("dataName: ", operationName, dataName, data);
	}
}