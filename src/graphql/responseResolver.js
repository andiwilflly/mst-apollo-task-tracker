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
		case "createTaskCustom":
            data = parse(data);

            store.lists.update(data.list);
            store.user.update(data.user);
            store.boards.update(data.board);
            store.tasks.create(data.task);
            break;
		case "deleteTaskCustom":
            data = parse(data);

            store.lists.update(data.list);
			store.user.update(data.user);
			store.boards.update(data.board);
            store.tasks.delete(data.deletedTaskId);
            break;
		default:
			console.log("dataName: ", operationName, dataName, data);
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