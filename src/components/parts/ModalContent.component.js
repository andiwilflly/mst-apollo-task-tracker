import React from 'react';
import Modal from 'react-responsive-modal';
// MobX
import { observer } from 'mobx-react';
// Sore
import store from "store";
// Component
import CreateTask from "components/parts/tasks/CreateTask.component";
import UpdateTask from "components/parts/tasks/UpdateTask.component";


@observer
class ModalContent extends React.Component {

	content = {
		get CreateTask() { return <CreateTask { ...store.modal.props } /> },
		get UpdateTask() { return <UpdateTask { ...store.modal.props } /> }
	};


	render() {
		return (
			<div>
				<Modal open={ store.modal.isOpen }
					   onClose={ store.modal.close }
					   center>
					{ this.content[store.modal.contentName] }
				</Modal>
			</div>
		)
	}
}

export default ModalContent
