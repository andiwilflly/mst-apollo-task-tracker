import React from 'react';
import Modal from 'react-responsive-modal';
// MobX
import { observer } from 'mobx-react';


@observer
class ModalContent extends React.Component {

	state = {
		open: false,
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};


	render() {
		return (
			<div>
				<button onClick={this.onOpenModal}>Open modal</button>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
					<h2>Simple centered modal</h2>
				</Modal>
			</div>
		)
	}
}

export default ModalContent
