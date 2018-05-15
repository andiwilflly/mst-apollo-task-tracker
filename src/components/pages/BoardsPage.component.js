import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Utils
import permissions from "utils/permissions.utils";
// Store
import store from "store";
// Components
import CreateBoardMutation from "components/parts/mutations/CreateBoardMutation.component";


@observer
@permissions
class BoardsPage extends React.Component {

	static permissions = {
		needAuth: true
	};


	@observable form = {
		name: "",
		description: "",
		authorId: store.user.id
	};


	render() {
		return (
			<div>
				<h3>Create new board</h3>
				<p>
					name:
					<input type="text"
						   value={ this.form.name }
						   onChange={ (e)=> this.form.name = e.currentTarget.value }/>
				</p>

				<p>
					description:
					<input type="text"
						   value={ this.form.description }
						   onChange={ (e)=> this.form.description = e.currentTarget.value }/>
				</p>

				<CreateBoardMutation form={ this.form } />
			</div>
		)
	}
}


export default BoardsPage;
