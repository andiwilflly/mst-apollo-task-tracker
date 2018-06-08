import React from 'react';
// Styles
import "styles/comments/comment.css";
// MobX
import { computed, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import TASK_COMMENTS_QUERY from "graphql/queries/comments/taskComments.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";
import Comment from 'components/parts/comments/Comment.component';


@observer
class TaskComments extends React.Component {


	@computed get taskComments() { return values(store.comments.all).filter((comment)=> comment.taskId === this.props.taskId )};


	render() {
		return (
			<div className="comments">
				<QueryLoader query={ TASK_COMMENTS_QUERY }
							 preLoader={<div className="comments"><PreLoader/></div>}
							 variables={{ taskId: this.props.taskId }}>
					{ this.taskComments.length ?
						this.taskComments.sort((comment)=> comment.createdTime).map((comment)=> <Comment key={comment.id} commentId={ comment.id } />)
						: null }
				</QueryLoader>
			</div>
		)
	}
}


export default TaskComments;
