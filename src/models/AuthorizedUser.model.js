import { runInAction } from "mobx";
import { types } from "mobx-state-tree";


const AuthorizedUserModel = {
	id: types.maybe(types.string)
};


const actions = (self)=> {
	return {

	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('AuthorizedUserModel', AuthorizedUserModel).actions(actions).views(views);