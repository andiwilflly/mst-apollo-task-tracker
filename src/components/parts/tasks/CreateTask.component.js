import React from 'react';
// Styles
import "styles/tasks/create_task.css";
import "styles/labels/labels_list.css";
// MobX
import { observer } from "mobx-react";
import { observable, values } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import AllLabels from "components/parts/labels/AllLabels.component";


@observer
class CreateTask extends React.Component {


	@observable isLoading = false;

	@observable form = {
		title: "",
		description: "",
		labels: []
	};


	get labels() { return values(store.labels.all); };


	addLabelToTask(label) {
		if(!this.form.labels.includes(label.id)) this.form.labels.push(label.id);
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
					<p>
						description:
						<textarea type="text"
								  value={ this.form.description }
								  onChange={ (e)=> this.form.description = e.currentTarget.value }/>
					</p>

					<br/>
					<button onClick={ this.creteTask }
							disabled={ this.isLoading }>{
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
