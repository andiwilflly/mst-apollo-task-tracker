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
		},
		name: {
			value: '',
			isEdit: false
		},
		phone: {
			value: '',
			isEdit: false
		}
	};


	componentDidMount() {
		this.form.email.value = this.user.email || "";
		this.form.avatar.value = this.user.avatar  || "";
		this.form.name.value = this.user.name  || "";
		this.form.phone.value = this.user.phone  || "";
	}


	@computed get user() { return store.users.all.get(this.props.userId); };

	@computed get isYou() { return this.props.userId === store.authorizedUser.id; };


	onDoubleClick(fieldName) {
		this.form[fieldName].isEdit = true;
		setTimeout(()=> {
			this.refs[fieldName].focus();
			this.refs[fieldName].select();
		}, 0);
	};


	onBlur(fieldName) {
		this.form[fieldName].isEdit = false;
		this.user.updateMutation({ ...this.user, [fieldName]: this.form[fieldName].value });
	};


	renderInput(filedName) {
		return (
			<div onDoubleClick={ ()=> this.isYou && this.onDoubleClick(filedName) }>
				{ filedName }:
				{ this.form[filedName].isEdit && this.isYou ?
					<input type="text"
						   ref={ filedName }
						   value={ this.form[filedName].value }
						   onBlur={ ()=> this.onBlur(filedName) }
						   onChange={ (e)=> this.form[filedName].value = e.currentTarget.value } />
					:
					<p className="input">
						{ filedName === "avatar" ?
							<img src={ this.form[filedName].value } style={{ height: "100%" }}/>
							:
							this.form[filedName].value
						}
					</p>
				}
			</div>
		);
	}


	render() {
		return (
			<div className="profile cf">
				<h3>Profile</h3>

				<div className="profile_cards">
					<div className="profile_card">
						{ this.renderInput("email") }
						{ this.renderInput("avatar") }
						{ this.renderInput("name") }
						{ this.renderInput("phone") }
					</div>

					{ this.isYou ?
						<div className="profile_card">
							<Invites />
						</div>
						: null }

					{ this.isYou ?
						<div className="profile_card">
							<AllLabels onLabelClick={ this.onLabelClick } />
						</div>
					: null }
				</div>
			</div>
		)
	}
}


export default Profile;
