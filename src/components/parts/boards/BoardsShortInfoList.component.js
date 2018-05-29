import React from 'react';
// Styles
import "styles/boards/board.css";
// MobX
import { observer } from "mobx-react";
// Components
import BoardsShortInfo from "components/parts/boards/BoardsShortInfo.component";


@observer
class BoardsShortInfoList extends React.Component {

	render() {
		return (
			<div className="boards_list">
				{ this.props.boardsIds.map((boardId)=> {
					return (
						<BoardsShortInfo boardId={ boardId } key={boardId} />
					);
				}) }
			</div>
		)
	}
}


export default BoardsShortInfoList;
