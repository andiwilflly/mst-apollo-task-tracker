import React from 'react';
import { Link } from "react-router-dom";
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
							<Link to="/login">Log in</Link>
						</div>
					}

				</Wrapper>
			</div>
		)
	}
}

export default Header;
