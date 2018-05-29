import React from 'react';
// MobX
import { computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import CreateBoard from "components/parts/boards/CreateBoard.component";
import BoardsList from "components/parts/boards/BoardsList.component";


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
				<BoardsList boardsIds={ this.user.myBoardsIds } />

				<p>Boards where I was invited</p>
				<BoardsList boardsIds={ this.user.boardsIds } />

				<hr/>
				<CreateBoard />
			</div>
		)
	}
}


export default BoardsPage;
