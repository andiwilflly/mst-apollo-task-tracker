import React from 'react';
// Utils
import permissions from "utils/permissions.utils";


@permissions
class HomePage extends React.Component {

	static permissions = {
		needAuth: true
	};

	render() {
		return (
			<div>
				HomePage
			</div>
		)
	}
}


export default HomePage;
