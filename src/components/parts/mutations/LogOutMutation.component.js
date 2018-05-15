import React from 'react';
import { withRouter } from "react-router-dom";
// Store
import store from "store";


@withRouter
class LogOutMutation extends React.Component {

	logOut = ()=> {
		store.logOutUser();
		this.props.history.push("/login");
	};


	render() {
		return (
			<div onClick={ this.logOut }>
				{ this.props.children }
			</div>
		)
	}
}


export default LogOutMutation;
