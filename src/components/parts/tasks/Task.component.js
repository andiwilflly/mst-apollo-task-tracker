import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class Task extends React.Component {

	get task() { return store.tasks.all.get(this.props.taskId); };


	render() {
		console.log("render", this.task);
		return (
			<div>
				Task!
			</div>
		)
	}
}


export default Task;
