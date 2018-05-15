import React from 'react';
import { withRouter } from "react-router-dom";
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import CREATE_BOARD_MUTATION from "graphql/mutations/createBoard.mutation";


@withRouter
class CreateBoardMutation extends React.Component {


	createBoard = (createBoardMutation)=> {
		createBoardMutation({ variables: {
			authorId: this.props.form.authorId,
			name: this.props.form.name,
			description: this.props.form.description
		}});
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
