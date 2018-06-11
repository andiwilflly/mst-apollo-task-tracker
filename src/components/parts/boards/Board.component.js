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
import UsersList from "components/parts/users/UsersList.component";
import BoardFilters from "components/parts/boards/BoardFilters.component";
import CreateList from "components/parts/lists/CreateList.component";
import Chat from "components/parts/chats/Chat.component";


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
			<div className="board">
				<div>
					<div className="cf">
						{ this.board.background ?
							<div style={{ marginRight: '20px', width: 100, height: 100, background: this.board.background, overflow: 'hidden', borderRadius: "50%", float: "left" }} />
							: null }
						<h3 style={{ float: "left", lineHeight: "100px" }}>{ this.board.name }</h3>
					</div>

					<BoardFilters boardId={ this.board.id } />

					<UsersList usersIds={ [...this.board.usersIds, this.board.authorId] } />

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

					<CreateList boardId={ this.props.boardId } />

					<Chat boardId={ this.board.id } />
				</div>
			</div>
		)
	}
}


export default Board;
