import React from 'react';
import Textarea from "react-textarea-autosize";
// Styles
import "styles/comments/comment.css";
// MobX
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
// GraphQL
import COMMENT_ALL_INFO_QUERY from "graphql/queries/comments/commentAllInfo.query";
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";
import UserIcon from "components/parts/users/UserIcon.component";


@observer
class Comment extends React.Component {

	@observable isLoading = false;

	@observable isEditing = false;


	@observable form = {
		text: ""
	};


	@computed get comment() { return store.comments.all.get(this.props.commentId); };


	onEditClick = ()=> {
		if(!this.form.text) this.form.text = this.comment.text;
		if(this.isEditing) this.comment.updateMutation({ ...this.comment, text: this.form.text });
		this.isEditing = !this.isEditing;
	};


	onChangeComment = (e)=> {
		this.form.text = e.currentTarget.value;
	};


	renderComment() {
		return (
			<div className="comment cf">
				<UserIcon userId={ this.comment.authorId } />
				<p className="comment_created_at">{ new Date(this.comment.createdTime).toLocaleString() }</p>
				{ this.isEditing ?
					<Textarea value={ this.form.text || this.comment.text }
							  className="comment_edit_textarea"
							  useCacheForDOMMeasurements
							  onChange={ this.onChangeComment } />
					:
					<p className="comment_text">{ this.comment.text }</p> }
				{ this.comment.authorId === store.authorizedUser.id ?
					<div className="cf">

						<p className="comment_controller" onClick={ this.onEditClick }>
							{ this.isEditing ?
								'save'
								:
								'edit'
							}
						</p>

						<p className="comment_controller" onClick={
							()=> store.comments.deleteMutation({ commentId: this.comment.id })
						}>delete</p>
					</div>
					: null }
			</div>
		);
	}


	render() {
		// W.O. Query...
		if(this.comment) return this.renderComment();

		return (
			<QueryLoader query={ COMMENT_ALL_INFO_QUERY }
						 preLoader={<div className="comment"><PreLoader/></div>}
						 variables={{ id: this.props.commentId }}>
				{ this.comment ?
					this.renderComment()
					:
					<div className="comment"><PreLoader /></div>
				}
			</QueryLoader>
		)
	}
}


export default Comment;
