import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';


@observer
class CreateBoard extends React.Component {

	@observable isLoading = false;


	@observable form = {
		name: "",
		description: "",
		authorId: store.authorizedUser.id
	};


	creteBoard = async ()=> {
		if(this.form.name === '') return;
		if(this.form.description === '') return;

		this.isLoading = true;
		await store.boards.createMutation(this.form);
		this.isLoading = false;
		this.form.name = "";
		this.form.description = "";
	};


	render() {

		return (
			<div>
				<h3>Create new board</h3>
				<p>
					name:
					<input type="text"
						   value={ this.form.name }
						   onChange={ (e)=> this.form.name = e.currentTarget.value } />
				</p>

				<p>
					description:
					<input type="text"
						   value={ this.form.description }
						   onChange={ (e)=> this.form.description = e.currentTarget.value }/>
				</p>

				<button onClick={ this.creteBoard }
						disabled={ this.isLoading }>{
					this.isLoading ?
						<PreLoader/>
						:
						'Create board'
				}</button>
			</div>
		)
	}
}


export default CreateBoard;
