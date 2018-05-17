import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// Components
import Lists from 'components/parts/lists/Lists.component'


@observer
class Board extends React.Component {


    @observable form = {
        boardId: this.props.boardId,
        name: ""
    };


	get board() { return store.boards.all.get(this.props.boardId); };


	render() {
		return (
			<div>
				Board!

                <Lists boardId={this.props.boardId} />

				<div>
					<hr/>
					<h3>Create new List</h3>
					<p>
						name:
						<input type="text"
							   value={ this.form.name }
							   onChange={ (e)=> this.form.name = e.currentTarget.value }/>
					</p>

					<button onClick={ ()=> store.lists.createMutation(this.form) }>Create list</button>
				</div>
			</div>
		)
	}
}


export default Board;
