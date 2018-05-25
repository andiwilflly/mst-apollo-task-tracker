import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import USER_UPDATE_MUTATION from "graphql/mutations/user/updateUser.mutation";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	avatar: types.maybe(types.string),
	phone: types.maybe(types.string),
	boards: types.frozen,
	myBoards: types.frozen,
	tasks: types.frozen
};


const actions = (self)=> {
	return {

		updateMutation: ({ id, email })=> {
			client.mutate({
				variables: { email, id },
				mutation: USER_UPDATE_MUTATION
			});
		},


		update(user) {
			runInAction(`USER-UPDATE-SUCCESS ${user.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(user[fieldName] !== undefined) self[fieldName] = user[fieldName];
				});
			});
		}
	};
};


const views = (self)=> {
	return {
		get boardIds() { return self.boards.map((board)=> board.id) },
		get myBoardsIds() { return self.myBoards.map((board)=> board.id) }
	};
};


export default types.model('UserModel', UserModel).actions(actions).views(views);