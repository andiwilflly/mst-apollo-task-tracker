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
				id: { this.task.id } <br/>
				title: { this.task.title }<br/>
				description: { this.task.description }<br/>
				authorId: { this.task.authorId }<br/>
				boardId: { this.task.boardId }<br/>
				listId: { this.task.listId }<br/>
			</div>
		)
	}
}


export default Task;
