import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
// Store
import store from "store";


@observer
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
				<ul>
					{ store.user.boards.map((boardId)=> {
						return (
							<li key={boardId}>
								<Link to={ `/boards/${boardId}`}>{ boardId }</Link>
								<button onClick={ ()=> store.user.deleteBoard(boardId) }>Delete</button>
							</li>
						);
					}) }
				</ul>
				<hr/>

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

				<button onClick={ ()=> store.boards.creteMutation(this.form) }>Create board</button>
			</div>
		)
	}
}


export default BoardsPage;
