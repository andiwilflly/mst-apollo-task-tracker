import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
// Queries
import ALL_POSTS_QUERY from "graphql/queries/allPosts.query";
// Components
import QueryLoader from "components/QueryLoader.component";


@observer
@permissions
class HomePage extends React.Component {

	static permissions = {
		needAuth: true
	};


	state = {
		show: false
	};


	render() {
		return (
			<div>
				{ this.state.show ?
					<QueryLoader query={ ALL_POSTS_QUERY }>
						HomePage!
					</QueryLoader>
					:
					<div>hide!</div>
				}
				<button onClick={ ()=> this.setState({ show: !this.state.show }) }>toggle</button>
			</div>
		)
	}
}


export default HomePage;
