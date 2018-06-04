import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/users/users-list.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


@observer
class UsersList extends React.Component {


	@observable showUser = null;


	get usersIds() { return this.props.usersIds; };


	renderContent(userId) {
		const user = store.users.all.get(userId);

		return (
			<li key={userId}
				className="users_list_item"
				style={{ background: `url(${user.avatar}) center / cover no-repeat` }}
				onMouseEnter={ ()=> this.showUser = user }
				onMouseLeave={ ()=> this.showUser = null }>
				<Link to={ `/users/${userId}` } />
			</li>
		);
	}


	render() {
		return (
			<ul className="users_list cf">
				{ this.usersIds.map((userId)=> {
					return (
						<QueryLoader key={userId}
									 query={ GET_USER_INFO_QUERY }
									 preLoader={ <li className="users_list_item"><PreLoader/></li>}
									 variables={{ id: userId }}>
							{ store.users.all.has(userId) ?
								this.renderContent(userId)
								:
								<li className="users_list_item"><PreLoader/></li>
							}
						</QueryLoader>
					);
				}) }
				{ this.showUser ?
					<p className="users_list_popover">{ this.showUser.email }</p>
					: null }
				{ this.props.children }
			</ul>
		)
	}
}


export default UsersList;
