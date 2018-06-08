import React from 'react';
// Styles
import "styles/boards/board.css";
// MobX
import { observer } from "mobx-react";
// Components
import BoardShortInfo from "components/parts/boards/BoardShortInfo.component";


@observer
class BoardsShortInfoList extends React.Component {

	render() {
		return (
			<div className="boards_list">
				{ this.props.boardsIds.map((boardId)=> {
					return (
						<BoardShortInfo boardId={ boardId }
										 key={boardId} />
					);
				}) }
			</div>
		)
	}
}


export default BoardsShortInfoList;
