import React from 'react';
// Styles
import "styles/invites.css";
// MobX
import { computed } from 'mobx';
import { observer } from 'mobx-react';
// Sore
import store from "store";


@observer
class Invites extends React.Component {


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	render() {
		return (
			<div>
				{ this.user.invites.map((invite)=> {
					return (
						<div key={invite.boardId}>
							<p>from user: { invite.fromUser }</p>
							<p>boardId: { invite.boardId }</p>
							<button onClick={ ()=> store.authorizedUser.acceptInviteMutation({
								userId: store.authorizedUser.id,
								inviteId: invite.id,
								inviteBoardId: invite.boardId,
								boardsIds: []
							}) }>Accept invitation</button>
						</div>
					);
				}) }
			</div>
		)
	}
}

export default Invites
