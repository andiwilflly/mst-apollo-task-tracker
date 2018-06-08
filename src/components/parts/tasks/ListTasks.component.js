import React from 'react';
// Styles
import "styles/comments/comment.css";
// MobX
import { computed, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import LIST_TASKS_QUERY from "graphql/queries/tasks/listTasks.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";
import Task from 'components/parts/tasks/Task.component';


@observer
class ListTasks extends React.Component {

	// TODO: Because of [optimistic updates for lists] of drag-n-drop event on [List.component]
	@computed get list() { return store.lists.all.get(this.props.listId); };

	@computed get listTasksIds() { return this.list.tasksIds; };

	@computed get listTasks() { return values(store.tasks.all).filter((task)=> this.listTasksIds.includes(task.id)); };


	render() {
		return (
			<div className="tasks">
				<QueryLoader query={ LIST_TASKS_QUERY }
							 preLoader={<div className="task"><PreLoader/></div>}
							 variables={{ listId: this.props.listId }}>
					{ this.listTasks.length ?
						this.listTasks.sort((task)=> task.createdTime).map((task)=> <Task key={task.id} taskId={ task.id } />)
						:
						null
					}
				</QueryLoader>
			</div>
		)
	}
}


export default ListTasks;
