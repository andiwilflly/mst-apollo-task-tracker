import React from 'react';
import { withRouter } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Components
import LogInForm from "components/parts/forms/LogInForm.component";


@withRouter
@observer
class LoginPage extends React.Component {

	static permissions = {
		notForAuth: true,
		redirectPath: "/"
	};


	@observable form = {
		email: "",
		password: ""
	};


	render() {
		return (
			<div>
				<LogInForm />
			</div>
		)
	}
}


export default LoginPage;
