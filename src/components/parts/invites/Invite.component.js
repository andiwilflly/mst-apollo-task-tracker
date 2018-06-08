import React from 'react';
// Styles
import "styles/invites/invites.css";
// MobX
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
// Sore
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import BoardShortInfo from "components/parts/boards/BoardShortInfo.component";


@observer
class Invite extends React.Component {


	@observable isLoading = false;


	@computed get user() { return store.users.all.get(store.authorizedUser.id); };


	acceptInvite = async ()=> {
		this.isLoading = true;
		await store.authorizedUser.acceptInviteMutation({
			userId: store.authorizedUser.id,
			inviteId: this.props.invite.id,
			boardsIds: [...this.user.boardsIds, this.props.invite.boardId]
		});
		this.isLoading = false;
	};

	declineInvite = async ()=> {
		this.isLoading = true;
		await store.authorizedUser.declineInviteMutation({
			userId: store.authorizedUser.id,
			inviteId: this.props.invite.id
		});
		this.isLoading = false;
	};


	render() {
		return (
			<div className="invite">
				<BoardShortInfo boardId={ this.props.invite.boardId }>
					<p>from user: { this.props.invite.emailInviteReceiver }</p>
					<button className="invite_accept_button"
							onClick={ this.acceptInvite }
							disabled={ this.isLoading }>
						{ this.isLoading ?
							<PreLoader />
							:
							'Accept invitation'
						}
					</button>
					<button className="invite_decline_button"
							onClick={ this.declineInvite }
							disabled={ this.isLoading }>
                        { this.isLoading ?
							<PreLoader />
                            :
                            'Decline invitation'
                        }
					</button>
				</BoardShortInfo>
			</div>
		)
	}
}

export default Invite;
