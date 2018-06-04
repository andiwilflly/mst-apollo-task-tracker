import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/search.css";
// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import SIGN_UP_USER_MUTATION from "graphql/mutations/signupUser.mutation";
// Components
import PreLoader from 'components/parts/PreLoader.component';


@observer
class RegistrationFrom extends React.Component {

	@observable isLoading = false;

	@observable form = {
		email: "",
		password: "",
		avatar: "",
		name: "",
		phone: "+3"
	};


	register = async (signUpMutation)=> {
		this.isLoading = true;
		await signUpMutation({ variables: {
				email: this.form.email,
				password: this.form.password,
				...this.form.avatar && { avatar: this.form.avatar },
				name: this.form.name,
				phone: this.form.phone
			}});
		this.isLoading = false;
	};


	render() {
		return (
			<div>
				<p>Email:</p>
				<input type="text"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value } />

				<p>Password:</p>
				<input type="password"
					   value={ this.form.password }
					   onChange={ (e)=> this.form.password = e.currentTarget.value } />

				<p>Avatar:</p>
				<input type="text"
					   value={ this.form.avatar }
					   onChange={ (e)=> this.form.avatar = e.currentTarget.value } />

				<p>Name:</p>
				<input type="text"
					   value={ this.form.name }
					   onChange={ (e)=> this.form.name = e.currentTarget.value } />

				<p>Phone</p>
				<input type="text"
					   value={ this.form.phone }
					   onChange={ (e)=> this.form.phone = e.currentTarget.value } />

				<Mutation mutation={SIGN_UP_USER_MUTATION}>
					{
						(signUpMutation)=> {
							return (
								<button onClick={ this.register.bind(this, signUpMutation) }
										disabled={ this.isLoading || !this.form.email || !this.form.password }>{
									this.isLoading ?
										<PreLoader />
										:
										'Register'
								}</button>
							)
						}
					}
				</Mutation>
				<hr/>
				<Link to="/login">Sign in</Link>
			</div>
		)
	}
}

export default RegistrationFrom;
