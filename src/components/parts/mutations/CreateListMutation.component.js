import React from 'react';
import { withRouter } from "react-router-dom";
import store from "store";
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import CREATE_LIST_MUTATION from "graphql/mutations/lists/createList.mutation";
// MobX
import { observer } from "mobx-react";
import { observable, computed } from "mobx";


@withRouter
@observer
class CreateListMutation extends React.Component {


    @observable form = {
        name: ""
    };


	createList = async (createListMutation)=> {
		const response = await createListMutation({ variables: {
			boardId: this.props.boardId,
			name: this.form.name
		}});

		console.log('resp', response);
		store.user.boards.get(this.props.boardId).createList(response.data.createList);
	};
	
	
	render() {
		return (
			<div>
				<p>
					list name:
					<input type="text"
						value={ this.form.name }
						onChange={ e => this.form.name = e.target.value } />
				</p>
				<Mutation mutation={CREATE_LIST_MUTATION}>
                    {
                        (createListMutation)=> <button onClick={ ()=> this.createList(createListMutation) }>Create list</button>
                    }
				</Mutation>
			</div>
		)
	}
}


export default CreateListMutation;
