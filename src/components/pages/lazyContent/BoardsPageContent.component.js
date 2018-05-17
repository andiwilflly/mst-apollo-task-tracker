import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import CreateBoard from "components/parts/boards/CreateBoard.component"


@observer
class BoardsPage extends React.Component {

	static permissions = {
		needAuth: true
	};


	render() {
		return (
			<div>
				<ul>
					{ store.user.boardIds.map((boardId)=> {
						return (
							<li key={boardId}>
								<Link to={ `/boards/${boardId}`}>{ boardId }</Link>
								<button onClick={ ()=> store.user.deleteBoard(boardId) }>Delete</button>
							</li>
						);
					}) }
				</ul>

				<hr/>
				<CreateBoard />
			</div>
		)
	}
}


export default BoardsPage;
