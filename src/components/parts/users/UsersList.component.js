import React from 'react';
// Styles
import "styles/users/users-list.css";
// MobX
import { computed } from "mobx";
import { observer } from "mobx-react";
// Components
import UserIcon from "components/parts/users/UserIcon.component";


@observer
class UsersList extends React.Component {


	@computed get usersIds() { return this.props.usersIds; };


	render() {
		return (
			<ul className="users_list cf">
				{ this.usersIds.map((userId)=> {
					return <UserIcon key={userId} userId={ userId } />
				}) }
			</ul>
		)
	}
}


export default UsersList;
