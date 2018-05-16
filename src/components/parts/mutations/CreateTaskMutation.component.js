import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import store from "store";
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import CREATE_TASK_MUTATION from "graphql/mutations/tasks/createTask.mutation";


@withRouter
@observer
class CreateTaskMutation extends React.Component {


    @observable form = {
        title: "",
        description: ""
    };


    createTask = async (createTaskMutation)=> {
        const response = await createTaskMutation({ variables: {
            boardId: this.props.boardId,
            title: this.form.title,
            description: this.form.description
        }});
        store.user.boards.get(this.props.boardId).updateTask(response.data.createTask);
    };


    render() {
        return (
            <div>
                <p>title:
                    <input type="text"
                           value={ this.form.title }
                           onChange={ (e)=> this.form.title = e.currentTarget.value }/>
                </p>

                <p>description:
                    <input type="text"
                           value={ this.form.description }
                           onChange={ (e)=> this.form.description = e.currentTarget.value }/>
                </p>

                <Mutation mutation={CREATE_TASK_MUTATION}>
                    {
                        (createTaskMutation)=> <button onClick={ this.createTask.bind(this, createTaskMutation) }>Create task</button>
                    }
                </Mutation>
            </div>
        )
    }
}


export default CreateTaskMutation;
