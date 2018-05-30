import React from 'react';
// Styles
import "styles/invites/invites.css";
// MobX
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
// Sore
import store from "store";
// Components
import BoardsShortInfo from "components/parts/boards/BoardsShortInfo.component";


@observer
class Invites extends React.Component {


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	@observable invite = {
		emailInviteReceiver: "",
		boardId: "",
		authorId: ""
	};


	componentDidMount() {
		this.invite.authorId = store.authorizedUser.id;
	}


	render() {
		return (
			<div className="invites">
				<h3>Invites</h3>

				{ this.user.invites.map((invite)=> {
					return (
						<div key={invite.boardId}>
							<p>from user: { invite.fromUser }</p>
							<p>boardId: { invite.boardId }</p>
							<button onClick={ ()=> store.authorizedUser.acceptInviteMutation({
								userId: store.authorizedUser.id,
								inviteId: invite.id,
								boardsIds: [...this.user.boardsIds, invite.boardId]
							}) }>Accept invitation</button>
						</div>
					);
				}) }

				<input type="text"
					   placeholder="email"
					   value={ this.invite.emailInviteReceiver }
					   onChange={ e => this.invite.emailInviteReceiver = e.target.value } />

				{ this.user.myBoardsIds.map((boardId)=> {
					return (
						<BoardsShortInfo boardId={ boardId } key={boardId}>
							<input type="radio"
								   name="board"
								   value={ boardId }
								   checked={ this.invite.boardId === boardId }
								   onChange={ (e)=> this.invite.boardId = e.currentTarget.value } />
						</BoardsShortInfo>
					);
				}) }

				<button>Send invite</button>
			</div>
		)
	}
}

export default Invites
