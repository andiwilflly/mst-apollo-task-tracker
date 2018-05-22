import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';


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
			<div>
				<h3>Create new task</h3>
				<p>
					name:
					<input type="text"
						   value={ this.form.title }
						   onChange={ (e)=> this.form.title = e.currentTarget.value }/>
				</p>

				<p>
					description:
					<input type="text"
						   value={ this.form.description }
						   onChange={ (e)=> this.form.description = e.currentTarget.value }/>
				</p>

				<button onClick={ this.creteTask }
						disabled={ this.isLoading }>{
					this.isLoading ?
						<PreLoader/>
						:
						'Create task'
				}</button>
			</div>
		)
	}
}


export default CreateList;
