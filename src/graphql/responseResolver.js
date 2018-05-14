export default function (response = []) {

	response.map((response)=> {
		const dataName = Object.keys(response.data)[0];
		const data = response.data[dataName];

		switch (dataName) {
			case "loggedInUser":
				console.log("loggedIn user!!!", data);
				break;
			default:
				console.log("dataName: ", dataName, data);
		}
	});
}