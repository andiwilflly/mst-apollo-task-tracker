import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";


@observer
class CreateList extends React.Component {


	@observable form = {
		name: "",
		boardId: this.props.boardId
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


				<button onClick={ ()=> store.lists.createMutation(this.form) }>Create list</button>
			</div>
		)
	}
}


export default CreateList;
