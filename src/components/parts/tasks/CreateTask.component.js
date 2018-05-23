import React from 'react';
// Styles
import "styles/tasks/create_task.css";
import "styles/labels/labels_list.css";
// MobX
import { observer } from "mobx-react";
import { observable, values } from "mobx";
// Store
import store from "store";
// GraphQL
import ALL_LABELS_QUERY from "graphql/queries/labels/allLabels.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";


@observer
class CreateList extends React.Component {


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
					<h4>Labels:</h4>

					<QueryLoader query={ ALL_LABELS_QUERY }>
						<ul className="labels_list">
							{ this.labels.map((label)=> {
								return (
									<li key={label.id}
										onClick={ ()=> this.addLabelToTask(label) }
										className="labels_list_label"
										style={{ background: label.color }} />
								);
							}) }
						</ul>
					</QueryLoader>
				</div>
			</div>
		)
	}
}


export default CreateList;
