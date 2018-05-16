import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import SIGN_UP_USER_MUTATION from "graphql/mutations/signupUser.mutation";


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


	login = (signUpMutation)=> {
		signUpMutation({ variables: {
			email: this.form.email,
			password: this.form.password
		}}).catch((e)=> {});
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
				<Link to="/login">Sign in</Link>
				<Mutation mutation={SIGN_UP_USER_MUTATION}>
					{
						(signUpMutation)=> <button onClick={ this.login.bind(this, signUpMutation) }>Register</button>
					}
				</Mutation>
			</div>
		)
	}
}


export default LoginPage;
