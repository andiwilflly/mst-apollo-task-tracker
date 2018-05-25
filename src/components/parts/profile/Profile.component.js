import React from 'react';
// MobX
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";


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
			<div>
				Profile (onKey press)

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
			</div>
		)
	}
}


export default Profile;
