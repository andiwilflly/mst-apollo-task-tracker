import React from 'react';
// Utils
import permissions from "utils/permissions.utils";


@permissions
class Page404 extends React.Component {

	render() {

		return (
			<div>
				404
			</div>
		)
	}
}


export default Page404;
