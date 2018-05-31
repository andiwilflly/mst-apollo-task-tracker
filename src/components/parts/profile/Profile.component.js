import React from 'react';
// Styles
import "styles/profile.css";
// MobX
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import Invites from "components/parts/invites/Invites.component";
// Components
import AllLabels from "components/parts/labels/AllLabels.component";


@observer
class Profile extends React.Component {


	@observable form = {
		email: {
			value: '',
			isEdit: false
		},
		avatar: {
			value: '',
			isEdit: false
		}
	};


	componentDidMount() {
		this.form.email.value = this.user.email;
		this.form.avatar.value = this.user.avatar;
	}


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	emailOnDoubleClick = ()=> {
		this.form.email.isEdit = true;
		setTimeout(()=> {
			this.refs.email.focus();
			this.refs.email.select();
		}, 0);
	};


	onEmailBlur = ()=> {
		this.form.email.isEdit = false;
		this.user.updateMutation({ ...this.user, email: this.form.email.value });
	};


	avatarOnDoubleClick = ()=> {
		this.form.avatar.isEdit = true;
		setTimeout(()=> {
			this.refs.avatar.focus();
			this.refs.avatar.select();
		}, 0);
	};


	onAvatarBlur = ()=> {
		this.form.avatar.isEdit = false;
		this.user.updateMutation({ ...this.user, avatar: this.form.avatar.value });
	};


	render() {
		return (
			<div className="profile cf">
				<h2>Profile (onKey press)</h2>

				<div onDoubleClick={ this.emailOnDoubleClick }>
					email:
					{ this.form.email.isEdit ?
						<input type="text"
							   ref="email"
							   value={ this.form.email.value }
							   onBlur={ this.onEmailBlur }
							   onChange={ (e)=> this.form.email.value = e.currentTarget.value }/>
						:
						<p className="input">{ this.form.email.value }</p>
					}
				</div>

				<div onDoubleClick={ this.avatarOnDoubleClick }>
					avatar:
					{ this.form.avatar.isEdit ?
						<input type="text"
							   ref="avatar"
							   value={ this.form.avatar.value }
							   onBlur={ this.onAvatarBlur }
							   onChange={ (e)=> this.form.avatar.value = e.currentTarget.value }/>
						:
						<p className="input">{ this.form.avatar.value }</p>
					}
				</div>

				<div className="profile_cards">
					<div className="profile_card">
						<Invites />
					</div>

					<div className="profile_card">
						<AllLabels onLabelClick={ this.onLabelClick } />
					</div>
				</div>
			</div>
		)
	}
}


export default Profile;
