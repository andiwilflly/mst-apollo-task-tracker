import React from 'react';
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


	@computed get comment() { return store.comments.all.get(this.props.commentId); };


	renderComment() {
		return (
			<div className="comment cf">
				<UserIcon userId={ this.comment.authorId } />
				<p className="comment_created_at">{ new Date(this.comment.createdTime).toLocaleString() }</p>
				{ this.comment.text }
				<div className="cf">
					<p className="comment_controller">edit</p>
					<p className="comment_controller" onClick={
						()=> store.comments.deleteMutation({ commentId: this.comment.id })
					}>delete</p>
				</div>
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
