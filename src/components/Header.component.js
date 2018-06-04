import React from 'react';
import { Link, withRouter } from "react-router-dom";
// Styles
import "styles/header.css";
import "styles/logo.css";
import "styles/main-menu.css";
// MobX
import { computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import PreLoader from "components/parts/PreLoader.component";
import LogOutMutation from "components/parts/mutations/LogOutMutation.component";
import Search from "components/parts/Search.component";


@withRouter
@observer
class Header extends React.Component {

	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	render() {
		return (
			<div className="header cf">
				<Link className="logo" to="/">
					<PreLoader />
				</Link>

				<div className="main-menu">
					{ store.authorizedUser ?
						<Link to="/profile" className="cf">
							<div style={{ width: '60px', height: '60px', background: `url(${this.user.avatar}) center / cover no-repeat`, overflow: 'hidden', borderRadius: "50%", float: "left" }} />
							<p style={{ float: "left", lineHeight: "60px", marginLeft: '20px' }}>Welcome, { this.user.name || this.user.email }</p>
						</Link>
						:
						null
					}

					<Link to="/boards">Boards</Link>

					{ store.authorizedUser ?
						<LogOutMutation>
							<a href="/">log out</a>
						</LogOutMutation>
						:
						this.props.location.pathname !== "/login" ?
							<Link to="/login">Log in</Link>
							: null
					}
				</div>

				<Search />
			</div>
		)
	}
}

export default Header;
