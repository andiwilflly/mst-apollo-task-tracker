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


	render() {
		return (
			<div>
				<input type="text"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value }/>
				<input type="password"
					   value={ this.form.password }
					   onChange={ (e)=> this.form.password = e.currentTarget.value }/>

				{ this.isLoading ?
					<PreLoader />
					:
					<button onClick={ ()=> store.logInMutation(this.form) }>LogIn</button>
				}

				<hr/>
				<p>or</p>
				<Link to="/registration">Sign up</Link>
			</div>
		)
	}
}

export default RegistrationFrom;
