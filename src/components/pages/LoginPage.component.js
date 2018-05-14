import React from 'react';
import { Link } from "react-router-dom";
// Apollo
import { Mutation } from 'react-apollo';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Utils
import permissions from "utils/permissions.utils";
// Mutations
import SIGN_UP_USER_MUTATION from "graphql/mutations/signupUser.mutation";


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


	login = async (signUpMutation)=> {
		const promise = signUpMutation({ variables: {
			email: this.form.email,
			password: this.form.password
		}}).catch((e)=> {});
		const response = await promise;
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
				<Mutation mutation={SIGN_UP_USER_MUTATION}>
					{
						(signUpMutation)=> <button onClick={ this.login.bind(this, signUpMutation) }>Login</button>
					}
				</Mutation>
			</div>
		)
	}
}


export default LoginPage;
