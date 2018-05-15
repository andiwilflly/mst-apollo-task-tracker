import React from 'react';
import { withRouter } from "react-router-dom";
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import SIGN_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";


@withRouter
class LoginMutation extends React.Component {

	login = async (signInMutation)=> {
		await signInMutation({ variables: {
			email: this.props.form.email,
			password: this.props.form.password
		}}).catch((e)=> {}).finally(()=> {});
		this.props.history.push("/");
	};


	render() {
		return (
			<Mutation mutation={SIGN_IN_USER_MUTATION}>
				{
					(signInMutation)=> <button onClick={ this.login.bind(this, signInMutation) }>Login</button>
				}
			</Mutation>
		)
	}
}


export default LoginMutation;
