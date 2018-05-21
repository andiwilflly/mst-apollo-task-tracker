import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/tasks/task.css";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


@observer
class Task extends React.Component {

	get task() { return store.tasks.all.get(this.props.taskId); };


	render() {
		const { id:taskId, authorId:userId, boardId, listId } = this.task;

		return (
			<div className="task cf">
				<Link className="task_title" to={`/boards/${this.task.boardId}/tasks/${this.task.id}`}>{  this.task.title }</Link>
				{ this.task.description }<br/>
				<button className="task_delete_button"
						onClick={ ()=> store.tasks.deleteMutation({ taskId, userId, boardId, listId }) }>
					Delete task
				</button>
			</div>
		)
	}
}


export default Task;
