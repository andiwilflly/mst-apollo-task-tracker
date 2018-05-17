import React from 'react';
import { Link, withRouter } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from "components/parts/PreLoader.component";


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
				<input type="text"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value }/>
				<input type="password"
					   value={ this.form.password }
					   onChange={ (e)=> this.form.password = e.currentTarget.value }/>
				<hr/>
				<Link to="/registration">Sign up</Link>

				{ this.isLoading ?
					<PreLoader />
					:
					<button onClick={ ()=> store.logInMutation(this.form) }>LogIn</button>
				}
			</div>
		)
	}
}


export default LoginPage;
