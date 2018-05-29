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
		name: "",
		boardId: this.props.boardId
	};


	createList = async ()=> {
		this.isLoading = true;
		await store.lists.createMutation(this.form);
		this.isLoading = false;
		this.form.name = "";
	};


	render() {

		return (
			<div>
				<h3>Create new list</h3>
				<p>
					name:
					<input type="text"
						   value={ this.form.name }
						   onChange={ (e)=> this.form.name = e.currentTarget.value }/>
				</p>

				<button onClick={ this.createList }
						disabled={ this.isLoading }>{
					this.isLoading ?
						<PreLoader/>
						:
						'Create list'
				}</button>
			</div>
		)
	}
}


export default CreateList;
