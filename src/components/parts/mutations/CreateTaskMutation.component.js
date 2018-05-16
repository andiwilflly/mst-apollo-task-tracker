import React from 'react';
import { withRouter } from "react-router-dom";
import store from "store";
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import CREATE_TASK_MUTATION from "graphql/mutations/tasks/createTask.mutation";


@withRouter
class CreateTaskMutation extends React.Component {


    createTask = async (createTaskMutation)=> {
        const response = await createTaskMutation({ variables: {
            boardId: this.props.form.boardId,
            title: this.props.form.title,
            description: this.props.form.description
        }});

        store.user.boards.get(this.props.form.boardId).updateTask(response.data.createTask);
    };


    render() {
        return (
            <Mutation mutation={CREATE_TASK_MUTATION}>
                {
                    (createTaskMutation)=> <button onClick={ this.createTask.bind(this, createTaskMutation) }>Create task</button>
                }
            </Mutation>
        )
    }
}


export default CreateTaskMutation;
