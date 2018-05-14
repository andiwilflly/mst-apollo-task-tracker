import React from 'react';
// Queries
import ALL_POSTS_QUERY from "graphql/queries/allPosts.query";
// Components
import Wrapper from "components/Wrapper.component";


class Header extends React.Component {

	render() {
		return (
			<div>
				<Wrapper query={ ALL_POSTS_QUERY } queryId={ "allPosts" }>
					Header
				</Wrapper>
			</div>
		)
	}
}

export default Header;
