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


	logIn = async ()=> {
		await store.logInMutation(this.form);
		// TODO: move this to model?
		this.props.history.push("/boards");
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
					<button onClick={ this.logIn }>LogIn</button>
				}
			</div>
		)
	}
}


export default LoginPage;
