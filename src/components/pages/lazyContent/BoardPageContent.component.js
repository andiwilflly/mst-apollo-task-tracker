import React from 'react';
// MobX
import { observer } from "mobx-react";
// GraphGL
import BOARD_ALL_INFO_QUERY from "graphql/queries/boards/boardAllInfo.query";
// Store
import store from "store";
// Components
import QueryLoader from "components/QueryLoader.component";


@observer
class BoardPage extends React.Component {

	get boardId() { return this.props.match.params.boardId; };

	get board() { return store.user.boards.get(this.boardId); };


	render() {
		if(!this.board) return <h2>No such board: { this.boardId }</h2>;
		return (
			<QueryLoader query={ BOARD_ALL_INFO_QUERY }
						 variables={{ id: this.boardId }}>
				<p>id: { this.board.id }</p>
				<p>name: { this.board.name }</p>
				<p>description: { this.board.description }</p>
			</QueryLoader>
		)
	}
}


export default BoardPage;
