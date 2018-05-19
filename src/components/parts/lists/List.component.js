import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import TASK_ALL_INFO_QUERY from "graphql/queries/tasks/taskAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import Task from 'components/parts/tasks/Task.component'


@observer
class List extends React.Component {

    get list() { return store.lists.all.get(this.props.listId); };


	creteTask = ()=> {
		store.tasks.createMutation({
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
            <div style={{ border: "1px solid gray", padding: 20 }}>
                <br/>
                id: { this.list.id } <br/>
                name: { this.list.name }<br/>
                <button onClick={ this.creteTask }>Crete task</button>
                <br/>
                <div style={{marginLeft: 20}}>
                    { this.list.taskIds.map((taskId)=> {
                        return (
                            <QueryLoader query={TASK_ALL_INFO_QUERY}
                                         key={taskId}
                                         variables={{id: taskId}}>
                                <hr/>
                                <Task taskId={taskId}/>
                            </QueryLoader>
                        );
                    })}
                </div>
            </div>
        )
    }
}


export default List;
