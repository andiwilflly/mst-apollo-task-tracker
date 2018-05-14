// Store
import store from "store";


export default function (response = [], request = {}) {

	response.map((response)=> {
		const operationName = request[0].operationName;
		const dataName = Object.keys(response.data)[0];
		const data = response.data[dataName];
		const errors = response.errors;

		console.groupCollapsed(`%c🕺 REQUEST ${operationName}`, "color: darkgreen");
		console.log("request", request);
		console.log("response", response);
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
	});
}