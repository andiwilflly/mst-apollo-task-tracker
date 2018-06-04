import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import LOG_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";
// Models
import AuthorizedUserModel from "models/AuthorizedUser.model";
import UsersModel from "models/users/Users.model";
import FiltersModel from "models/Filters.model";
import ModalModel from "models/Modal.model";
import BoardsModel from "models/boards/Boards.model";
import ListsModel from "models/lists/Lists.model";
import TasksModel from "models/tasks/Tasks.model";
import CommentsModel from "models/comments/Comments.model";
import LabelsModel from "models/labels/Labels.model";


const RootModel = {
	modal: ModalModel,
	nextPathUrl: types.maybe(types.string),
	filters: FiltersModel,

	authorizedUser: types.optional(types.maybe(AuthorizedUserModel), null),
	users: UsersModel,
	boards: BoardsModel,
	lists: ListsModel,
	tasks: TasksModel,
	comments: CommentsModel,
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
			}).catch((e)=> console.log("LOG_IN_USER_MUTATION" + e));
		},

		logIn: (userId)=> { store.authorizedUser = { id: userId } },
		logOut: ()=> {
			sessionStorage.removeItem('token');
			store.authorizedUser = null;
		}
	};
};


export default types.model(RootModel).actions(actions);