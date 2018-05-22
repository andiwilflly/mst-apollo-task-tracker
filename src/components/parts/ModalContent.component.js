import React from 'react';
import Modal from 'react-responsive-modal';
// MobX
import { observer } from 'mobx-react';
// Sore
import store from "store";
// Component
import CreateTask from "components/parts/tasks/CreateTask.component";


@observer
class ModalContent extends React.Component {

	content = {
		get CreateTask() { return <CreateTask { ...store.modal.props } /> }
	};


	render() {
		return (
			<div>
				<Modal open={ store.modal.isOpen }
					   onClose={ store.modal.close }
					   center>
					{ this.content[store.modal.content] }
				</Modal>
			</div>
		)
	}
}

export default ModalContent
