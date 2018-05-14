// Store
import store from "store";


export default function (response = [], operationName = "") {

	response.map((response)=> {
		const dataName = Object.keys(response.data)[0];
		const data = response.data[dataName];

		switch (dataName) {
			case "loggedInUser":

				console.log("loggedIn user!!!", data);
				break;
			// case "allPosts":
			// 	console.log("dataName: ", operationName, dataName, data);
			// 	break;
			default:
				console.log("dataName: ", operationName, dataName, data);
		}
	});
}