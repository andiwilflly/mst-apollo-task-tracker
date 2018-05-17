import React from 'react';
// MobX
import { observer } from "mobx-react";
// Apollo
import { Mutation } from 'react-apollo';
// GraphGL
import BOARD_ALL_INFO_QUERY from "graphql/queries/boards/boardAllInfo.query";
// import TASK_ALL_INFO_QUERY from "graphql/queries/tasks/taskAllInfo.query";
// import DELETE_TASK_MUTATION from "graphql/mutations/tasks/deleteTask.mutation";
// Store
import store from "store";
// Components
import QueryLoader from "components/QueryLoader.component";
import Board from "components/parts/boards/Board.component";


@observer
class BoardPage extends React.Component {

	get boardId() { return this.props.match.params.boardId; };


	removeTask = async (taskId, removeTaskMutation)=> {
        const response = await removeTaskMutation({ variables: {
            taskId: taskId
		}});
        store.user.boards.get(this.boardId).deleteTask(taskId);
    };


	render() {

		return (
			<QueryLoader query={ BOARD_ALL_INFO_QUERY }
						 variables={{ id: this.boardId }}>
				<Board boardId={ this.boardId } />

				{/*{ Object.keys(this.tasks).map((taskId)=> {*/}
					{/*return (*/}
						{/*<QueryLoader query={ TASK_ALL_INFO_QUERY }*/}
									 {/*key={taskId}*/}
									 {/*variables={{ id: taskId }}>*/}
							{/*<br/>*/}
							{/*<p>taskId: { taskId }</p>*/}
							{/*<p>title: { this.tasks[taskId].title }</p>*/}
							{/*<p>description: { this.tasks[taskId].description }</p>*/}
							{/*<Mutation mutation={DELETE_TASK_MUTATION}>*/}
                                {/*{*/}
                                    {/*(removeTaskMutation)=> <button onClick={ ()=> this.removeTask(taskId, removeTaskMutation) }>Remove</button>*/}
                                {/*}*/}
							{/*</Mutation>*/}
						{/*</QueryLoader>*/}
					{/*);*/}
				{/*}) }*/}
				{/*<CreateListMutation boardId={this.boardId} />*/}
				{/*<CreateTaskMutation boardId={this.boardId} />*/}
			</QueryLoader>
		)
	}
}


export default BoardPage;
