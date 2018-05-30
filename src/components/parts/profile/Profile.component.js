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
		}
	};


	componentDidMount() {
		this.form.email.value = this.user.email;
	}


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	emailOnDoubleClick = ()=> {
		this.form.email.isEdit = true;
		setTimeout(()=> this.refs.email.focus(), 0);
	};


	onEmailBlur = ()=> {
		this.form.email.isEdit = false;
		this.user.updateMutation({ ...this.user, email: this.form.email.value });
	};


	render() {
		return (
			<div className="profile cf">
				<h2>Profile (onKey press)</h2>

				<div onDoubleClick={ this.emailOnDoubleClick } style={{ width: 200 }}>
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
