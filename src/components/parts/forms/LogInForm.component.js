import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/search.css";
// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';


@observer
class RegistrationFrom extends React.Component {

	@observable isLoading = false;

	@observable form = {
		email: "",
		password: ""
	};


	logIn = async ()=> {
		this.isLoading = true;
		await store.logInMutation(this.form);
		this.isLoading = false;
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

				<button onClick={  this.logIn }
						disabled={ this.isLoading || !this.form.email || !this.form.password }>{
					this.isLoading ?
						<PreLoader/>
						:
						'LogIn'
				}</button>

				<p>or</p>
				<Link to="/registration">Sign up</Link>
			</div>
		)
	}
}

export default RegistrationFrom;
