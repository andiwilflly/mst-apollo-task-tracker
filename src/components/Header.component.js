import React from 'react';
import { Link, withRouter } from "react-router-dom";
// Styles
import "styles/header.css";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import LogOutMutation from "components/parts/mutations/LogOutMutation.component";


@observer
@withRouter
class Header extends React.Component {

	render() {
		return (
			<div className="header">
				<div className="wrapper">
					Header
					{ store.user ?
						<div>
							logged in <br/>
							email: { store.user.email } <br/>
							<LogOutMutation>
								<button>log out!</button>
							</LogOutMutation>
						</div>
						:
						<div>
							{ this.props.location.pathname !== "/login" ?
								<Link to="/login">Log in</Link>
								: null }
						</div>
					}

					<Link to="/">Home</Link><br/>
				</div>
			</div>
		)
	}
}

export default Header;
