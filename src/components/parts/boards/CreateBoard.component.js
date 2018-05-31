import React from 'react';
// Styles
import "styles/boards/board-create.css";
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
		background: "",
		authorId: store.authorizedUser.id
	};


	get background() { return this.form.background.match("http") ? `url(${this.form.background}) no-repeat 0 0 / cover` : this.form.background };


	creteBoard = async ()=> {
		if(this.form.name === '') return;
		if(this.form.description === '') return;

		this.isLoading = true;
		await store.boards.createMutation({ ...this.form, background: this.background });
		this.isLoading = false;
		this.form.name = "";
		this.form.description = "";
		this.form.background = "";
	};


	render() {
		return (
			<div className="board_create" style={{ background: `${this.background}` }}>
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

				<p>
					background:
					<input type="text"
						   value={ this.form.background }
						   onChange={ (e)=> this.form.background = e.currentTarget.value }/>
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
