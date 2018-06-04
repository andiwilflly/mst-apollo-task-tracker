import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import RegistrationForm from "components/parts/forms/RegistrationFrom.component";


@observer
class LoginPage extends React.Component {

	static permissions = {
		notForAuth: true,
		redirectPath: "/"
	};


	render() {
		return (
			<div>
				<RegistrationForm />
			</div>
		)
	}
}


export default LoginPage;
