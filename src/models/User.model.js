import { types } from "mobx-state-tree";


const UserModel = {
	name: types.maybe(types.string),
	bio: types.maybe(types.string),
	avatar: types.maybe(types.string),
	followers: types.maybe(types.number),
	following: types.maybe(types.number)
};


const actions = (store)=> {
	return {
	};
};


export default types.model('UserModel', UserModel).actions(actions);