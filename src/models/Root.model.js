import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import LOG_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";
// Models
import UserModel from "models/User.model";
import BoardsModel from "models/boards/Boards.model";
import ListsModel from "models/lists/Lists.model";
import TasksModel from "models/tasks/Tasks.model";


const RootModel = {
	user: types.optional(types.maybe(UserModel), null),
	boards: BoardsModel,
	lists: ListsModel,
	tasks: TasksModel
};


const actions = (store)=> {
	return {

		logInMutation: async ({ email, password })=> {
			const response = await client.mutate({
				variables: { email, password },
				mutation: LOG_IN_USER_MUTATION
			});
		},

		logOutMutation: ()=> {
			store.logOut();
			console.log("logOutMutation mutation: ");
			// TODO: Redirect?
		},

		logIn: (userId)=> { store.user = { id: userId } },
		logOut: ()=> { store.user = null }
	};
};


export default types.model(RootModel).actions(actions);