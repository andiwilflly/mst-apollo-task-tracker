import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


@observer
@permissions
@lazy(()=> import(/* webpackChunkName: "BoardsPage" */ 'components/pages/lazyContent/BoardsPageContent.component'))
class BoardsPage extends React.Component {

	static permissions = {
		needAuth: true
	};
}


export default BoardsPage;
