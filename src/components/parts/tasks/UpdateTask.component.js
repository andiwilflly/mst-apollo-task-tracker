import React from 'react';
// Styles
import "styles/tasks/create_task.css";
import "styles/labels/labels_list.css";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import AllLabels from "components/parts/labels/AllLabels.component";
import Label from 'components/parts/labels/Label.component';
import CreateComment from 'components/parts/comments/CreateComment.component';
import Comment from 'components/parts/comments/Comment.component';


@observer
class UpdateList extends React.Component {


	@observable isLoading = false;

	@observable form = {
		title: '',
		description: '',
		labels: []
	};


	componentDidMount() {
		this.form.title = this.props.task.title;
		this.form.description = this.props.task.description;

		const labels = this.props.task.labels.map((label)=> store.labels.all.get(label.id).id);
		this.form.labels = [...labels];
	}


	addLabelToTask(label) {
		if(!this.form.labels.includes(label.id)) this.form.labels.push(label.id);
	}


	removeLabelFromTask(labelId) {
		this.form.labels.splice(this.form.labels.indexOf(labelId), 1);
	}


	updateTask = async ()=> {
		this.isLoading = true;
		await this.props.task.updateMutation({
			id: this.props.task.id,
			labelsIds: this.form.labels,
			title: this.form.title,
			description: this.form.description
		});
		this.isLoading = false;
		store.modal.close();
	};


	render() {
		return (
			<div className="create_task cf">
				<h3>Update task</h3>
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

						<div className="create_task_preview">
							<div className="task cf">
								<h3 className="task_title">{  this.form.title }</h3>
								<p dangerouslySetInnerHTML={{ __html: this.form.description }} />

								<ul className="labels_list">
									{ this.form.labels.map((labelId)=> {
										return <Label key={labelId}
													  onClick={ ()=> this.removeLabelFromTask(labelId) }
													  labelId={ labelId } />;
									}) }
								</ul>
							</div>
						</div>
					</div>
					<button onClick={ this.updateTask }
							disabled={ this.isLoading }>{
						this.isLoading ?
							<PreLoader/>
							:
							'Update task'
					}</button>
				</div>
				<div className="create_task_sidebar">

					<div className="create_task_sidebar_item">
						<AllLabels onLabelClick={ (label)=> this.addLabelToTask(label) } />
					</div>

					<div className="create_task_sidebar_item">
						<CreateComment taskId={ this.props.task.id } />

						{ this.props.task.commentsIds.map((commentId)=> {
							return (
								<Comment key={commentId} commentId={ commentId } />
							)
						}) }
					</div>
				</div>
			</div>
		)
	}
}


export default UpdateList;
