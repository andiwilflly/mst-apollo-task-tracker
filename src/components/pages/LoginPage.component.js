import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// Apollo
import { Mutation } from 'react-apollo';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Utils
import permissions from "utils/permissions.utils";
// Mutations
import SIGN_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";


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


	login = async (signInMutation)=> {
		await signInMutation({ variables: {
			email: this.form.email,
			password: this.form.password
		}}).catch((e)=> {}).finally(()=> {});
		this.props.history.push("/");
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
				<Mutation mutation={SIGN_IN_USER_MUTATION}>
					{
						(signInMutation)=> <button onClick={ this.login.bind(this, signInMutation) }>Login</button>
					}
				</Mutation>
			</div>
		)
	}
}


export default withRouter(LoginPage);
