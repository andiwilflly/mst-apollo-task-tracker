import React from 'react';
import { Link, withRouter } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class Header extends React.Component {

	render() {
		return (
			<div>
				Header
				{ store.user ?
					<div>
						logged in <br/>
						email: { store.user.email } <br/>
						<button onClick={ store.logOutUser }>log out</button>
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
		)
	}
}

export default withRouter(Header);
