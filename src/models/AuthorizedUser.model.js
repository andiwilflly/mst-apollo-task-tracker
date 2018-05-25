import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// GraphQl
import client from "graphql/client";
import CREATE_INVITE_MUTATION from "graphql/mutations/invites/createInvite.mutation";
import ACCEPT_INVITE_MUTATION from "graphql/mutations/invites/acceptInvite.mutation";


const AuthorizedUserModel = {
	id: types.maybe(types.string)
};


const actions = (self)=> {
	return {

		createInviteMutation({ userId, boardId, fromUser }) {
			client.mutate({
				variables: { userId, boardId, fromUser },
				mutation: CREATE_INVITE_MUTATION
			});
		},


		acceptInviteMutation({ userId, inviteId, boardsIds = [] }) {
			client.mutate({
				variables: { userId, inviteId, boardsIds },
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