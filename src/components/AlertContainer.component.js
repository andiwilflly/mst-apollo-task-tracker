import React from 'react';
import Alert from 'react-s-alert';
// Styles
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';


class AlertContainer extends React.Component {

	render() {
		return (
			<div>
				<Alert stack={{limit: 3}} effect="bouncyflip" position='bottom-right' />
			</div>
		)
	}
}

export default AlertContainer
