import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";


@observer
class CreateBoard extends React.Component {


	@observable form = {
		name: "",
		description: "",
		authorId: store.authorizedUser.id
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

				<button onClick={ ()=> store.boards.creteMutation(this.form) }>Create board</button>
			</div>
		)
	}
}


export default CreateBoard;
