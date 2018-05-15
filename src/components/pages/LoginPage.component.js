import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Utils
import permissions from "utils/permissions.utils";
// Components
import LogInMutation from "components/parts/mutations/LogInMutation.component";


@observer
@permissions
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
				<input type="text"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value }/>
				<input type="password"
					   value={ this.form.password }
					   onChange={ (e)=> this.form.password = e.currentTarget.value }/>
				<hr/>
				<Link to="/registration">Sign up</Link>

				<LogInMutation form={ this.form } />
			</div>
		)
	}
}


export default LoginPage;
