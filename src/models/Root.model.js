import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import LOG_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";
// Models
import UserModel from "models/User.model";
import ModalModel from "models/Modal.model";
import BoardsModel from "models/boards/Boards.model";
import ListsModel from "models/lists/Lists.model";
import TasksModel from "models/tasks/Tasks.model";
import LabelsModel from "models/labels/Labels.model";


const RootModel = {
	modal: ModalModel,
	nextPathUrl: types.maybe(types.string),
	user: types.optional(types.maybe(UserModel), null),
	boards: BoardsModel,
	lists: ListsModel,
	tasks: TasksModel,
	labels: LabelsModel
};


const actions = (store)=> {
	return {

		setNextPathUrl(url = "") {
			store.nextPathUrl = url;
		},


		logInMutation: ({ email, password })=> {
			client.mutate({
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