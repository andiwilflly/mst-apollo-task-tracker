import React from 'react';
// Styles
import "styles/tasks/create_task.css";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import LabelsList from 'components/parts/labels/LabelsList.component';


@observer
class CreateList extends React.Component {


	@observable isLoading = false;

	@observable form = {
		title: "",
		description: "",
	};


	creteTask = async ()=> {
		this.isLoading = true;
		await store.tasks.createMutation({
			authorId:  this.props.authorId,
			boardId: this.props.boardId,
			listId: this.props.listId,
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
					<h4>Labels:</h4>
					<LabelsList />
				</div>
			</div>
		)
	}
}


export default CreateList;
