import React from 'react';
// Styles
import "styles/comments/comment.css";
// MobX
import { observer } from "mobx-react";
// GraphQL
import TASK_COMMENTS_QUERY from "graphql/queries/comments/taskComments.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";
import Comment from 'components/parts/comments/Comment.component';


@observer
class Comments extends React.Component {

	render() {
		return (
			<div className="comments">
				<QueryLoader query={ TASK_COMMENTS_QUERY }
							 preLoader={<div className="comments"><PreLoader/></div>}
							 variables={{ taskId: this.props.taskId }}>
					{ this.props.commentsIds.map((commentId)=> <Comment key={commentId} commentId={ commentId } />) }
				</QueryLoader>
			</div>
		)
	}
}


export default Comments;