import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// GraphQl
import client from "graphql/client";
import ACCEPT_INVITE_MUTATION from "graphql/mutations/user/acceptInvite.mutation";


const AuthorizedUserModel = {
	id: types.maybe(types.string)
};


const actions = (self)=> {
	return {

		acceptInviteMutation({ userId, inviteId, inviteBoardId, boardsIds = [] }) {
			client.mutate({
				variables: { userId, inviteId, inviteBoardId, boardsIds },
				mutation: ACCEPT_INVITE_MUTATION
			});
		}

	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('AuthorizedUserModel', AuthorizedUserModel).actions(actions).views(views);