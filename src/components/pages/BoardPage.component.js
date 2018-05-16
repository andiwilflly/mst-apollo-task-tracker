import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
// Utils
import permissions from "utils/permissions.utils";
// GraphGL
import BOARD_ALL_INFO_QUERY from "graphql/queries/boards/boardAllInfo.query";
import BOARD_TASK_ALL_INFO_QUERY from "graphql/queries/tasks/boardTaskAllInfo.query";
// Store
import store from "store";
// Components
import QueryLoader from "components/QueryLoader.component";
import CreateTaskMutation from "components/parts/mutations/CreateTaskMutation.component";


@observer
@permissions
class BoardPage extends React.Component {

	static permissions = {
		needAuth: true
	};


    @observable form = {
        title: "",
        description: "",
        boardId: this.boardId
    };


	get boardId() { return this.props.match.params.boardId; };

	get board() { return store.user.boards.get(this.boardId); };

	get tasks() { return this.board.tasks.toJSON(); };


	renderTasks() {
		return (
            <div>
				<h1>Tasks:</h1>
                { Object.keys(this.tasks).map(taskId =>
					<QueryLoader key={taskId}
								 query={ BOARD_TASK_ALL_INFO_QUERY }
								 variables={{ id: taskId }}>
						<hr/>
						<h4>title: { this.tasks[taskId].title }</h4>
						<p>description: { this.tasks[taskId].description }</p>
					</QueryLoader>
                )}
			</div>
		)
	}


	render() {
		if(!this.board) return <h2>No such board: { this.boardId }</h2>;

        return (
			<QueryLoader query={ BOARD_ALL_INFO_QUERY }
						 variables={{ id: this.boardId }}>
				<p>id: { this.board.id }</p>
				<p>name: { this.board.name }</p>
				<p>description: { this.board.description }</p>

				{ this.renderTasks() }

				<p>
					title:
					<input type="text"
						   value={ this.form.title }
						   onChange={ (e)=> this.form.title = e.currentTarget.value } />
				</p>

				<p>
					description:
					<input type="text"
						   value={ this.form.description }
						   onChange={ (e)=> this.form.description = e.currentTarget.value } />
				</p>

				<CreateTaskMutation form={this.form} />

			</QueryLoader>
		)
	}
}


export default BoardPage;
