import React from 'react';
// Styles
import "styles/boards/board.css";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// GraphQL
import LIST_ALL_INFO_QUERY from "graphql/queries/lists/listAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";
import List from "components/parts/lists/List.component";


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
				<p>Board!</p>
				<p>name: {this.board.name}</p>

				<div className="board">
					{ this.board.listIds.map((listId)=> {
						return (
							<QueryLoader query={ LIST_ALL_INFO_QUERY }
										 key={listId}
										 preLoader={ <div className="list"><PreLoader/></div>}
										 variables={{ id: listId }}>
								<List listId={ listId } />
							</QueryLoader>
						);
					}) }
				</div>

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
