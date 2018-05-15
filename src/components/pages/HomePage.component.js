import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


@observer
@permissions
@lazy(()=> import(/* webpackChunkName: "HomePage" */ 'components/pages/lazyContent/HomePageContent.component'))
class HomePage extends React.Component {

	static permissions = {
		needAuth: true
	};
}


export default HomePage;
