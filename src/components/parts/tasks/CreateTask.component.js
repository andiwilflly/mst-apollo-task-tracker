import React from 'react';
// Styles
import "styles/tasks/create_task.css";
import "styles/labels/labels_list.css";
// MobX
import { observer } from "mobx-react";
import { observable, values, computed } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import AllLabels from "components/parts/labels/AllLabels.component";
import Label from 'components/parts/labels/Label.component';
import UserIcon from "components/parts/users/UserIcon.component";
import TaskComments from 'components/parts/comments/TaskComments.component';


@observer
class CreateTask extends React.Component {


	@observable isLoading = false;

	@observable form = {
		title: "",
		description: "",
		labels: []
	};


	@computed get taskCommentsIds() { return this.props.task ? this.props.task.commentsIds : []; };

	@computed get labels() { return values(store.labels.all); };


	addLabelToTask(label) {
		if(!this.form.labels.includes(label.id)) this.form.labels.push(label.id);
	}


	removeLabelFromTask(labelId) {
		this.form.labels.splice(this.form.labels.indexOf(labelId), 1);
	}


	creteTask = async ()=> {
		this.isLoading = true;
		await store.tasks.createMutation({
			authorId:  this.props.authorId,
			boardId: this.props.boardId,
			listId: this.props.listId,
			labelsIds: this.form.labels,
			title: this.form.title,
			description: this.form.description
		});
		this.isLoading = false;
		store.modal.close();
	};


	renderTaskPreview() {
		const task = this.props.task || {
			authorId: store.authorizedUser.id,
			createdTime: Date.now(),
			commentsIds: []
		};
		return (
			<div className="create_task_preview cf">
				<div className="task cf" style={{ cursor: "default" }}>

					<div className="task_header cf">
						<UserIcon userId={ task.authorId } />
						<h3 className="task_title">{  this.form.title }</h3>
						<p dangerouslySetInnerHTML={{ __html: this.form.description }} />
					</div>

					<ul className="labels_list">
						{ this.form.labels.map((labelId)=> {
							return <Label key={labelId}
										  onClick={ ()=> this.removeLabelFromTask(labelId) }
										  labelId={ labelId } />;
						}) }
					</ul>

					<p className="task_created_time">{ new Date(task.createdTime).toLocaleString() }</p>

					{ this.props.task ?
						<TaskComments taskId={ this.props.task.id }
									  commentsIds={ this.taskCommentsIds } />
						: null
					}
				</div>
			</div>
		);
	}


	render() {
		return (
			<div className="create_task cf">
				<h3>Create new task</h3>
				<div className="create_task_form">
					<p>
						name:
						<input type="text"
							   value={ this.form.title }
							   onChange={ (e)=> this.form.title = e.currentTarget.value }/>
					</p>

					<br/>
					<div>
						description:
						<textarea value={ this.form.description }
								  onChange={ (e)=> this.form.description = e.currentTarget.value }/>

						{ this.renderTaskPreview() }
					</div>

					<br/>
					<button onClick={ this.creteTask }
							disabled={ this.isLoading || !this.form.title || !this.form.description }>{
						this.isLoading ?
							<PreLoader/>
							:
							'Create task'
					}</button>
				</div>
				<div className="create_task_sidebar">
					<AllLabels onLabelClick={ (label)=> this.addLabelToTask(label) } />
				</div>
			</div>
		)
	}
}


export default CreateTask;
