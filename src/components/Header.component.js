import React from 'react';
import { Link, withRouter } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
// Queries
import ALL_POSTS_QUERY from "graphql/queries/allPosts.query";
// Store
import store from "store";
// Components
import Wrapper from "components/Wrapper.component";


@observer
class Header extends React.Component {

	render() {
		console.log(this.props, 42);
		return (
			<div>
				<Wrapper query={ ALL_POSTS_QUERY }
						 queryId={ "allPostsIds" }>
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
				</Wrapper>
			</div>
		)
	}
}

export default withRouter(Header);
