import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
// Styles
import "styles/tasks/task.css";
// MobX
import { observable, computed, values } from "mobx";
import { observer } from "mobx-react";
// GraphQL
import TASK_ALL_INFO_QUERY from "graphql/queries/tasks/taskAllInfo.query";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import Label from 'components/parts/labels/Label.component';
import QueryLoader from "components/QueryLoader.component";
import UsersList from "components/parts/users/UsersList.component";


@observer
class Task extends React.Component {

	@observable isLoading = false;


	@computed get task() { return store.tasks.all.get(this.props.taskId); };

	@computed get taskLabels() { return values(store.labels.all).filter((label)=> label.tasks.map((task)=> task.id).includes(this.task.id)); };

	@computed get taskLabelsColors() { return this.taskLabels.map((label)=> label.color); };

	@computed get isHideTask() {
		if(!store.filters.byLabels.length) return false;
		return !store.filters.byLabels.filter((color)=> this.taskLabelsColors.includes(color)).length;

	};


	deleteTask = async ()=> {
		this.isLoading = true;
		await store.tasks.deleteMutation({
			taskId: this.task.id,
			userId: this.task.authorId,
			boardId: this.task.boardId,
			listId: this.task.listId
		});
	};


	editTask = ()=> {
		store.modal.open("UpdateTask", { task: this.task });
	};


	renderTask() {
		if(this.isHideTask) return null;

		return (
			<DragDropContainer targetKey="task"
							   returnToBase={true}
							   dragData={{
								   taskId: this.task.id,
								   listId: this.task.listId
							   }}>
				<div className="task cf">
					<UsersList usersIds={ [this.task.authorId] }>
						<p className="task_created_time">{ new Date(this.task.createdTime).toLocaleString() }</p>
					</UsersList>

					<h3 className="task_title">{  this.task.title }</h3>
					<div className="task_edit" onDoubleClick={ this.editTask }>✎</div>

					<p dangerouslySetInnerHTML={{ __html: this.task.description }} />

					<ul className="labels_list">
						{ this.task.labelsIds.map((labelId)=> {
							return <Label key={labelId} labelId={ labelId } />;
						}) }
					</ul>

					{ this.task.commentsIds.length ?
						<div className="task_dialog" style={{ float: "right" }}>
							🗨 { this.task.commentsIds.length }
						</div>
						:
						null }

					<button className="task_delete_button"
							onClick={ this.deleteTask }
							disabled={ this.isLoading }>{
						this.isLoading ?
							<PreLoader/>
							:
							'Delete task'
					}</button>
				</div>
			</DragDropContainer>
		);
	}


	render() {
		return (
			<QueryLoader query={ TASK_ALL_INFO_QUERY }
						 preLoader={<div className="task"><PreLoader/></div>}
						 variables={{ id: this.props.taskId }}>
				{ this.task ?
					this.renderTask()
					:
					<div className="task"><PreLoader /></div>
				}
			</QueryLoader>
		)
	}
}


export default Task;
