import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/boards/board.css";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";
// Store
import store from "store";
// GraphQL
import BOARD_SHORT_INFO_QUERY from "graphql/queries/boards/boardShortInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


@observer
class BoardsList extends React.Component {


	renderBoard(boardId) {
		const board = store.boards.all.get(boardId);
		if(!board) return <PreLoader />;

		return (
			<div className="boards_list_item">
				<Link to={ `/boards/${boardId}`}>{ board.name }</Link>
				<p>{ board.description }</p>
				<button onClick={ ()=> {}}>Delete board?</button>
			</div>
		);
	}


	render() {
		return (
			<div className="boards_list">
				{ this.props.boardsIds.map((boardId)=> {
					return (
						<QueryLoader query={ BOARD_SHORT_INFO_QUERY }
									 key={boardId}
									 preLoader={ <div className="boards_list_item"><PreLoader /></div>}
									 variables={{ id: boardId }}>
							{ this.renderBoard(boardId) }
						</QueryLoader>
					);
				}) }
			</div>
		)
	}
}


export default BoardsList;
