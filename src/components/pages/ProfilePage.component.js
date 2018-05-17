import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


@observer
@permissions
@lazy(()=> import(/* webpackChunkName: "ProfilePage" */ 'components/pages/lazyContent/ProfilePageContent.component'))
class ProfilePage extends React.Component {

	static permissions = {
		needAuth: true
	};
}


export default ProfilePage;
