import React from 'react';
import { withRouter } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
// Styles
import "styles/sidebar.css";


@withRouter
@observer
class Sidebar extends React.Component {

	render() {
		return (
			<div className="sidebar">
				Sidebar { this.props.location.pathname }
			</div>
		)
	}
}

export default Sidebar
