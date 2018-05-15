import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";


@observer
@permissions
class BoardsPage extends React.Component {

	static permissions = {
		needAuth: true
	};


	render() {
		return (
			<div>
				Boards page
			</div>
		)
	}
}


export default BoardsPage;
