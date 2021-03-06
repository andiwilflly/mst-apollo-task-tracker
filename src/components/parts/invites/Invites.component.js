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
import BoardShortInfo from "components/parts/boards/BoardShortInfo.component";
import PreLoader from 'components/parts/PreLoader.component';
import Invite from 'components/parts/invites/Invite.component';


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
		this.isLoading = true;
		await store.authorizedUser.acceptInviteMutation({
			userId: store.authorizedUser.id,
			inviteId: invite.id,
			boardsIds: [...this.user.boardsIds, invite.boardId]
		});
		this.isLoading = false;
	};


	renderBoards() {
		if(!this.user.myBoardsIds.length) return <div style={{ margin: '10px 0' }}>You have no boards yet. <Link to="/boards">You need to create board first</Link></div>;

		return (
			<div>
				{ this.user.myBoardsIds.map((boardId)=> {
					return (
						<BoardShortInfo boardId={ boardId } key={boardId}>
							<input type="radio"
								   name="board"
								   value={ boardId }
								   checked={ this.invite.boardId === boardId }
								   onChange={ (e)=> this.invite.boardId = e.currentTarget.value } />
						</BoardShortInfo>
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
							<Invite invite={ invite } key={invite.id}/>
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
