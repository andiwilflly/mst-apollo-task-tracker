import React from 'react';
// Styles
import "styles/invites.css";
// MobX
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
// Sore
import store from "store";


@observer
class Invites extends React.Component {


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	emailForInvite = observable.box('');


	render() {
		return (
			<div>
				<hr/>
				<h3>Invites:</h3>
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

				<br/>
				<br/>

				Write email for invite:
				<input type="text"
					   value={ this.emailForInvite.get() }
					   onChange={ e =>  this.emailForInvite.set(e.target.value) } />

					{ this.user.myBoardsIds.map((boardId)=> {
					return (
						<button key={ boardId }
								onClick={ ()=> {
                                    if(!this.emailForInvite) return;
                                    store.authorizedUser.createInviteMutation({
                                        boardId: boardId,
                                        email: this.emailForInvite
                                    });
                                } }>
							Crete invite for board { boardId }
							</button>
					);
				}) }
				<hr/>
			</div>
		)
	}
}

export default Invites
