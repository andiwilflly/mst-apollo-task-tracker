import React from 'react';
// Utils
import permissions from "utils/permissions.utils";


@permissions
class LoginPage extends React.Component {

	static permissions = {
		notForAuth: true
	};

	render() {
		return (
			<div>
				LoginPage
			</div>
		)
	}
}


export default LoginPage;
