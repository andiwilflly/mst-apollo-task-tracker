import React from 'react';
import { Link } from "react-router-dom";
// Styles
import "styles/invites/invites.css";
// MobX
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
// Sore
import store from "store";
// Components
import BoardsShortInfo from "components/parts/boards/BoardsShortInfo.component";
import PreLoader from 'components/parts/PreLoader.component';


@observer
class Invites extends React.Component {


	@observable isLoading = false;

	@observable invite = {
		emailInviteReceiver: "",
		boardId: "",
		authorId: ""
	};


	componentDidMount() {
		this.invite.authorId = store.authorizedUser.id;
	}


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };

	@computed get isDisabledSendInviteButton() { return this.isLoading || !this.user.myBoardsIds.length || !this.invite.emailInviteReceiver || !this.invite.boardId };


	sendInvite = async ()=> {
		this.isLoading = true;
		await store.authorizedUser.createInviteMutation(this.invite);
		this.isLoading = false;
		this.invite.boardId = "";
	};


	acceptInvite = async (invite)=> {
		await store.authorizedUser.acceptInviteMutation({
			userId: store.authorizedUser.id,
			inviteId: invite.id,
			boardsIds: [...this.user.boardsIds, invite.boardId]
		});
	};


	renderBoards() {
		if(!this.user.myBoardsIds.length) return <div style={{ margin: '10px 0' }}>You have no boards yet. <Link to="/boards">You need to create board first</Link></div>;

		return (
			<div>
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
			</div>
		);
	}


	render() {
		return (
			<div className="invites">
				<h3>Invites</h3>

				<div className="invites_list">
					{ this.user.invites.map((invite)=> {
						return (
							<div key={invite.boardId} className="invites_list_item">
								<BoardsShortInfo boardId={ invite.boardId }>
									<p>from user: { invite.emailInviteReceiver }</p>
									<button onClick={ this.acceptInvite.bind(this, invite) }>Accept invitation</button>
								</BoardsShortInfo>
							</div>
						);
					}) }
				</div>

				<h4>Create new invite</h4>
				<input type="text"
					   placeholder="email"
					   value={ this.invite.emailInviteReceiver }
					   onChange={ e => this.invite.emailInviteReceiver = e.target.value } />

				<button onClick={ this.sendInvite }
						disabled={ this.isDisabledSendInviteButton }>
					{ this.isLoading ?
						<PreLoader />
						:
						'Send invite'
					}
				</button>

				<h4>Choose board</h4>
				{ this.renderBoards() }
			</div>
		)
	}
}

export default Invites
