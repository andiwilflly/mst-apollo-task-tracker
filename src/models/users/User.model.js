import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import USER_UPDATE_MUTATION from "graphql/mutations/user/updateUser.mutation";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	avatar: types.maybe(types.string),
	name: types.maybe(types.string),
	phone: types.maybe(types.string),
	lastVisit: types.maybe(types.string),
	boards: types.frozen,
	myBoards: types.frozen,
	tasks: types.frozen,
	comments: types.frozen,
	invites: types.frozen
};


const actions = (self)=> {
	return {

		updateMutation: ({ id, email, avatar, name, phone })=> {
			client.mutate({
				variables: { id, email, avatar, name, phone, lastVisit: "" + Date.now() },
				mutation: USER_UPDATE_MUTATION
			}).catch((e)=> console.log("USER_UPDATE_MUTATION", e));
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
		get boardsIds() { return self.boards.map((board)=> board.id) },
		get myBoardsIds() { return self.myBoards.map((board)=> board.id) },
		get tasksIds() { return self.tasks.map((task)=> task.id) },
		get commentsIds() { return self.comments.map((comment)=> comment.id); }
	};
};


export default types.model('UserModel', UserModel).actions(actions).views(views);