import React from 'react';
// Styles
import "styles/comments/comment.css";
// MobX
import { computed, observable, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_TASKS_QUERY from "graphql/queries/tasks/userTasks.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";
import Task from 'components/parts/tasks/Task.component';


@observer
class UserTasks extends React.Component {

	@observable sortByDateTop = true;


	@computed get userTasks() { return values(store.tasks.all).filter((task)=> task.authorId === this.props.userId); };


	render() {
		return (
			<div className="tasks">
				<QueryLoader query={ USER_TASKS_QUERY }
							 preLoader={<div className="task"><PreLoader/></div>}
							 variables={{ userId: this.props.userId }}>
					{ this.userTasks.length ?
						this.userTasks.map((task)=> <Task key={task.id} taskId={ task.id } />)
						:
						null
					}
				</QueryLoader>
			</div>
		)
	}
}


export default UserTasks;
