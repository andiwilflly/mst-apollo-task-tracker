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
import BoardFilters from "components/parts/boards/BoardFilters.component";
import CreateList from "components/parts/lists/CreateList.component";


@observer
class Board extends React.Component {


    @observable form = {
        boardId: this.props.boardId,
        name: ""
    };


	get board() { return store.boards.all.get(this.props.boardId); };


	render() {
		if(!this.board) return <div className="board">No such board ${this.props.boardId}</div>;

		return (
			<div>
				<BoardFilters boardId={ this.board.id } />

				<div className="board">
					<h1>{ this.board.name }</h1>

					<div className="board_lists">
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
				</div>

				<CreateList boardId={ this.props.boardId } />
			</div>
		)
	}
}


export default Board;
