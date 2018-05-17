import React from 'react';
import { Link, withRouter } from "react-router-dom";
// Styles
import "styles/header.css";
import "styles/logo.css";
import "styles/main-menu.css";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import PreLoader from "components/parts/PreLoader.component";
import LogOutMutation from "components/parts/mutations/LogOutMutation.component";


@withRouter
@observer
class Header extends React.Component {

	render() {
		return (
			<div className="header cf">
				<Link className="logo" to="/">
					<PreLoader />
				</Link>

				<div className="main-menu">
					{ store.user ?
						<LogOutMutation>
							<a href="#">log out</a>
						</LogOutMutation>
						:
						this.props.location.pathname !== "/login" ?
							<Link to="/login">Log in</Link>
							: null
					}

					<Link to="/">Home</Link>
					<Link to="/boards">Boards</Link>
				</div>
			</div>
		)
	}
}

export default Header;
