import { types } from "mobx-state-tree";
// Models
import UserModel from "models/User.model"


const RootModel = {
	user: types.optional(types.maybe(UserModel), null)
};


const actions = (store)=> {
	return {
	};
};


export default types.model(RootModel).actions(actions);