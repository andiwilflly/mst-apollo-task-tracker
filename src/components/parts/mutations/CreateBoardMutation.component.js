import React from 'react';
import { withRouter } from "react-router-dom";
import store from "store";
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import CREATE_BOARD_MUTATION from "graphql/mutations/boards/createBoard.mutation";


@withRouter
class CreateBoardMutation extends React.Component {


	createBoard = async (createBoardMutation)=> {
		const response = await createBoardMutation({ variables: {
			authorId: this.props.form.authorId,
			name: this.props.form.name,
			description: this.props.form.description
		}});

		store.user.createBoard(response.data.createBoard);
		console.log(response, 42);
	};
	
	
	render() {
		return (
			<Mutation mutation={CREATE_BOARD_MUTATION}>
				{
					(createBoardMutation)=> <button onClick={ this.createBoard.bind(this, createBoardMutation) }>Create board</button>
				}
			</Mutation>
		)
	}
}


export default CreateBoardMutation;
