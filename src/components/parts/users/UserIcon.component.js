import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/users/user-icon.css";
// MobX
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Utils
import msToTime from "utils/msToTime.util";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


@observer
class UserIcon extends React.Component {

	static defaultProps = {
		width: 30,
		height: 30
	};


	@observable showUser = null;

	@observable currentTimeMs = Date.now();


	componentDidMount() {
		setInterval(()=> this.currentTimeMs = Date.now(),1000);
	}

	@computed get user() { return store.users.all.get(this.props.userId); };

	@computed get isOnline() { return ((this.currentTimeMs - +this.user.lastVisit) / 1000) < 40; };


	renderContent() {

		return (
			<div className="user_icon"
				style={{
					background: `url(${this.user.avatar}) center / cover no-repeat`,
					width: this.props.width,
					height: this.props.height
				}}
				onMouseEnter={ ()=> this.showUser = this.user }
				onMouseLeave={ ()=> this.showUser = null }>
				<Link to={ `/users/${this.props.userId}` } />
				<div className="user_icon_online_status" style={{ background: this.isOnline ? "#15b915" : "transparent" }} />

				{ this.showUser ?
					<p className="user_icon_popover">
						<span>{ this.showUser.email }</span><br/>
						<span>{ this.isOnline ?  "online" : "last visit: " + msToTime(this.currentTimeMs - +this.showUser.lastVisit) + " ago" }</span>
					</p>
					: null }
			</div>
		);
	}


	render() {
		return (
			<QueryLoader query={ GET_USER_INFO_QUERY }
						 preLoader={ <div className="user_icon"><PreLoader/></div>}
						 variables={{ id: this.props.userId }}>
				{ this.user ?
					this.renderContent()
					:
					<div className="user_icon"><PreLoader/></div>
				}
			</QueryLoader>
		)
	}
}


export default UserIcon;
