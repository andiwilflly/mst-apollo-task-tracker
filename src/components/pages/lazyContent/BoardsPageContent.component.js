import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { computed } from "mobx";
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


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	render() {
		return (
			<div>
				<p>My boards</p>
				<ul>
					{ this.user.myBoardsIds.map((boardId)=> {
						return (
							<li key={boardId}>
								<Link to={ `/boards/${boardId}`}>{ boardId }</Link>
								<button onClick={ ()=> {}}>Delete board?</button>
							</li>
						);
					}) }
				</ul>

				<p>Boards where I was invited</p>
				<ul>
					{ this.user.boardsIds.map((boardId)=> {
						return (
							<li key={boardId}>
								<Link to={ `/boards/${boardId}`}>{ boardId }</Link>
								<button onClick={ ()=> {}}>Delete board?</button>
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
