import React from 'react';
// MobX
import { observer } from "mobx-react";
// Apollo
import { Mutation } from 'react-apollo';
// GraphGL
import BOARD_ALL_INFO_QUERY from "graphql/queries/boards/boardAllInfo.query";
import BOARD_TASK_ALL_INFO_QUERY from "graphql/queries/tasks/boardTaskAllInfo.query";
import DELETE_TASK_MUTATION from "graphql/mutations/tasks/deleteTask.mutation";
// Store
import store from "store";
// Components
import QueryLoader from "components/QueryLoader.component";
import CreateTaskMutation from "components/parts/mutations/CreateTaskMutation.component";
import CreateListMutation from "components/parts/mutations/CreateListMutation.component";


@observer
class BoardPage extends React.Component {

	get boardId() { return this.props.match.params.boardId; };

	get board() { return store.user.boards.get(this.boardId); };

	get tasks() { return this.board.tasks.toJSON(); };


	removeTask = async (taskId, removeTaskMutation)=> {
        const response = await removeTaskMutation({ variables: {
            taskId: taskId
		}});
        store.user.boards.get(this.boardId).deleteTask(taskId);
    };


	render() {
		if(!this.board) return <h2>No such board: { this.boardId }</h2>;

		return (
			<QueryLoader query={ BOARD_ALL_INFO_QUERY }
						 variables={{ id: this.boardId }}>
				<p>id: { this.board.id }</p>
				<p>name: { this.board.name }</p>
				<p>description: { this.board.description }</p>
				<br/>
				<p>tasks:</p>
				{ Object.keys(this.tasks).map((taskId)=> {
					return (
						<QueryLoader query={ BOARD_TASK_ALL_INFO_QUERY }
									 key={taskId}
									 variables={{ id: taskId }}>
							<br/>
							<p>taskId: { taskId }</p>
							<p>title: { this.tasks[taskId].title }</p>
							<p>description: { this.tasks[taskId].description }</p>
							<Mutation mutation={DELETE_TASK_MUTATION}>
                                {
                                    (removeTaskMutation)=> <button onClick={ ()=> this.removeTask(taskId, removeTaskMutation) }>Remove</button>
                                }
							</Mutation>
						</QueryLoader>
					);
				}) }
				<hr/>
				<CreateListMutation boardId={this.boardId} />
				<hr/>
				<CreateTaskMutation boardId={this.boardId} />
			</QueryLoader>
		)
	}
}


export default BoardPage;
