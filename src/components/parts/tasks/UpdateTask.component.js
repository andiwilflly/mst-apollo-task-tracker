import React from 'react';
// Styles
import "styles/tasks/create_task.css";
import "styles/labels/labels_list.css";
// MobX
import { computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import CreateTask from 'components/parts/tasks/CreateTask.component';
import PreLoader from 'components/parts/PreLoader.component';
import AllLabels from "components/parts/labels/AllLabels.component";
import CreateComment from 'components/parts/comments/CreateComment.component';
import EditorHTML from 'components/lazy/EditorHTML.component';


@observer
class UpdateList extends CreateTask {

	componentDidMount() {
		this.form.title = this.props.task.title;
		this.form.description = this.props.task.description;

		const labels = this.props.task.labels.map((label)=> store.labels.all.get(label.id).id);
		this.form.labels = [...labels];
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
						<EditorHTML onModelChange={ this.onDescriptionChange }
									model={ this.form.description }
									tag='textarea' />

						{ this.renderTaskPreview() }
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
					</div>
				</div>
			</div>
		)
	}
}


export default UpdateList;
