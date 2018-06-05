import React from 'react';
// Styles
import "styles/comments/comment-create.css"
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';


@observer
class CreateComment extends React.Component {


	@observable isLoading = false;

	@observable form = {
		text: "",
		authorId: "",
		taskId: ""
	};


	componentDidMount() {
		this.form.authorId = store.authorizedUser.id;
		this.form.taskId = this.props.taskId;
	}


	createComment = async ()=> {
		this.isLoading = true;
		await store.comments.optimisticCreate(this.form);
		this.isLoading = false;
	};


	render() {
		return (
			<div className="comment_create">
				<h4>CreateComment</h4>
				<input type="text"
					   value={ this.form.text }
					   onChange={ (e)=> this.form.text = e.currentTarget.value } />

				<button onClick={ this.createComment }
						disabled={ this.isLoading || !this.form.text }>{
					this.isLoading ?
						<PreLoader />
						:
						'Create comment'
				}</button>
			</div>
		)
	}
}


export default CreateComment;
