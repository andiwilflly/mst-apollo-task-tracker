import React from 'react';
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import TASK_ALL_INFO_QUERY from "graphql/queries/tasks/taskAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from 'components/parts/PreLoader.component';
import Task from 'components/parts/tasks/Task.component';
// Utils
import isLoading from 'utils/fetchMixin.util';


// @fetchComponent
@observer
class List extends React.Component {

    @observable isLoading = false;

    get list() { return store.lists.all.get(this.props.listId); };


    @isLoading
    async creteTask() {
        await store.tasks.createMutation({
			authorId: store.user.id,
			boardId: this.list.boardId,
			listId: this.props.listId,
			title: "Test Task title",
			description: "decription of the task"
		});
	};


    render() {
        if(!this.list) return <h3>No list { this.props.listId }</h3>;

        return (
            <div className="list">
                <p>List!</p>
                id: { this.list.id } <br/>
                name: { this.list.name }<br/>
                <button onClick={ e => this.creteTask(e) }
                        disabled={ this.isLoading }>{
                    this.isLoading ?
                        <PreLoader/>
                        :
                        'Create task'
                }</button>
                <br/>
				{ this.list.taskIds.map((taskId)=> {
					return (
						<QueryLoader query={TASK_ALL_INFO_QUERY}
									 key={taskId}
									 variables={{id: taskId}}>
							<hr/>
							<Task taskId={taskId}/>
						</QueryLoader>
					);
				}) }
            </div>
        )
    }
}


export default List;
