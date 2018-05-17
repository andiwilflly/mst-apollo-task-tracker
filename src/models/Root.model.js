import { types } from "mobx-state-tree";
// GraphQl
import client from "graphql/client";
import LOG_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";
// Models
import UserModel from "models/User.model";


const RootModel = {
	user: types.optional(types.maybe(UserModel), null)
};


const actions = (store)=> {
	return {
		// User
		logInMutation: async ({ email, password })=> {
			const response = await client.mutate({
				variables: { email, password },
				mutation: LOG_IN_USER_MUTATION
			});
			console.log("logInMutation mutation: ", response);
			// TODO: Redirect?
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