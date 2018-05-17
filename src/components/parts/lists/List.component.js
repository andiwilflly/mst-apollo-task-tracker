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


    render() {
        return (
            <div>
                <hr/>
                <br/>
                id: { this.list.id } <br/>
                name: { this.list.name }<br/>

                { this.list.taskIds.map((taskId) => {
                    return (
                        <QueryLoader query={TASK_ALL_INFO_QUERY}
                                     key={taskId}
                                     variables={{id: taskId}}>
                            <Task taskId={taskId}/>
                        </QueryLoader>
                    );
                })}
            </div>
        )
    }
}


export default List;
