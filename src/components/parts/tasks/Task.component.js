import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
// Styles
import "styles/tasks/task.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Utils
import isLoading from 'utils/fetchMixin.util';
// Components
import PreLoader from 'components/parts/PreLoader.component';


@observer
class Task extends React.Component {

	@observable isLoading = false;


	get task() { return store.tasks.all.get(this.props.taskId); };


	@isLoading
	deleteTask = async ()=> {
		return store.tasks.deleteMutation({
			taskId: this.task.id,
			userId: this.task.authorId,
			boardId: this.task.boardId,
			listId: this.task.listId
		});
	};


	render() {
		if(!this.task) return <div className="task"><PreLoader /></div>;

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
					<p style={{ fontSize: 10 }}>listId: { this.task.listId }</p>
					<button className="task_delete_button"
							onClick={ this.deleteTask }>
						Delete task
					</button>
				</div>
			</DragDropContainer>
		)
	}
}


export default Task;
