import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import TASK_ALL_INFO_QUERY from "graphql/queries/tasks/taskAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import Task from "components/parts/tasks/Task.component";


@observer
class Board extends React.Component {

	get board() { return store.boards.all.get(this.props.boardId); };


	render() {
		return (
			<div>
				Board!
				<br/>
				<button onClick={ ()=> store.boards.deleteMutation(this.props.boardId) }>Delete board</button>
				<hr/>
				{ this.board.taskIds.map((taskId)=> {
					return (
						<QueryLoader query={ TASK_ALL_INFO_QUERY }
									 key={taskId}
									 variables={{ id: taskId }}>
							<Task taskId={taskId} />
						</QueryLoader>
					);
				}) }
			</div>
		)
	}
}


export default Board;
