import { types } from "mobx-state-tree";
// GraphQl
import client from "graphql/client";
import INVITE_CREATE_CUSTOM_MUTATION from "graphql/mutations/invites/createInviteCustom.mutation";
import ACCEPT_INVITE_MUTATION from "graphql/mutations/invites/acceptInvite.mutation";


const AuthorizedUserModel = {
	id: types.maybe(types.string)
};


const actions = (self)=> {
	return {

		createInviteMutation({ emailInviteReceiver, boardId, authorId }) {
			client.mutate({
				variables: { emailInviteReceiver, boardId, authorId },
				mutation: INVITE_CREATE_CUSTOM_MUTATION
			}).catch((e)=> console.log("INVITE_CREATE_CUSTOM_MUTATION", e));
		},


		acceptInviteMutation({ userId, inviteId, boardsIds = [] }) {
			client.mutate({
				variables: { userId, inviteId, boardsIds },
				mutation: ACCEPT_INVITE_MUTATION
			}).catch((e)=> console.log("ACCEPT_INVITE_MUTATION", e));
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('AuthorizedUserModel', AuthorizedUserModel).actions(actions).views(views);