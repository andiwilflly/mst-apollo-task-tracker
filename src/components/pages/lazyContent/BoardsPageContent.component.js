import React from 'react';
// MobX
import { computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import CreateBoard from "components/parts/boards/CreateBoard.component";
import BoardsShortInfoList from "components/parts/boards/BoardsShortInfoList.component";


@observer
class BoardsPage extends React.Component {

	static permissions = {
		needAuth: true
	};


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	render() {
		return (
			<div>
				<h3>My boards</h3>
				<BoardsShortInfoList boardsIds={ this.user.myBoardsIds } />

				<h3>Boards where I was invited</h3>
				<BoardsShortInfoList boardsIds={ this.user.boardsIds } />

				<CreateBoard />
			</div>
		)
	}
}


export default BoardsPage;
