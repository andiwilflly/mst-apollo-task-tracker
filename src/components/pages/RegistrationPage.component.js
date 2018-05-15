import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


@observer
@permissions
@lazy(()=> import(/* webpackChunkName: "RegistrationPage" */ 'components/pages/lazyContent/RegistrationPageContent.component'))
class RegistrationPage extends React.Component {

	static permissions = {
		notForAuth: true,
		redirectPath: "/"
	};
}


export default RegistrationPage;
