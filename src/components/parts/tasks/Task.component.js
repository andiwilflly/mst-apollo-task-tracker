import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
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
			<DragDropContainer targetKey="task"
							   returnToBase={true}
							   dragData={{
							   	  taskId: this.task.id,
								  listId: this.task.listId
							   }}>
				<div className="task cf">
					<h3 className="task_title">{  this.task.title }</h3>
					{ this.task.description }<br/>
					<button className="task_delete_button"
							onClick={ ()=> store.tasks.deleteMutation({ taskId, userId, boardId, listId }) }>
						Delete task
					</button>
				</div>
			</DragDropContainer>
		)
	}
}


export default Task;
