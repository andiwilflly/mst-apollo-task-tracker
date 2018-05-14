import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Utils
import permissions from "utils/permissions.utils";


@observer
@permissions
class LoginPage extends React.Component {

	static permissions = {
		notForAuth: true
	};


	@observable form = {
		email: "",
		password: ""
	};


	login = ()=> {
		console.log("register!", this.form.email, this.form.password);
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
				<button onClick={ this.login }>Register</button>
				<hr/>
				<Link to="/login">Sign in</Link>
			</div>
		)
	}
}


export default LoginPage;
