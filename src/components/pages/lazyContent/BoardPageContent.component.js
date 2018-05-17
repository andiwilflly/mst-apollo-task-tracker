import React from 'react';
// MobX
import { observer } from "mobx-react";
// GraphGL
import BOARD_ALL_INFO_QUERY from "graphql/queries/boards/boardAllInfo.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import Board from "components/parts/boards/Board.component";


@observer
class BoardPage extends React.Component {

	get boardId() { return this.props.match.params.boardId; };


	render() {
		return (
			<QueryLoader query={ BOARD_ALL_INFO_QUERY }
						 variables={{ id: this.boardId }}>
				<Board boardId={ this.boardId } />
			</QueryLoader>
		)
	}
}


export default BoardPage;
