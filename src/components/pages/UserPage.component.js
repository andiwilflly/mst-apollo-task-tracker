import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


@observer
@permissions
@lazy(()=> import(/* webpackChunkName: "UserPage" */ 'components/pages/lazyContent/UserPageContent.component'))
class UserPage extends React.Component {

	static permissions = {
		needAuth: true
	};
}


export default UserPage;
