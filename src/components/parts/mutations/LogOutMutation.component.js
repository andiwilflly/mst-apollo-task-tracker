import React from 'react';
import { withRouter } from "react-router-dom";
// Store
import store from "store";


// TODO: Get rid of this file
@withRouter
class LogOutMutation extends React.Component {

	logOut = ()=> {
		store.logOut();
		this.props.history.push("/login");
	};


	render() {
		return (
			<span onClick={ this.logOut }>
				{ this.props.children }
			</span>
		)
	}
}


export default LogOutMutation;
