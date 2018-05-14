import { types } from "mobx-state-tree";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
};


const actions = (self)=> {
	return {
		setInfo: (data)=> {
			Object.keys(self).map((fieldName)=> self[fieldName] = data[fieldName]);
		}
	};
};


export default types.model('UserModel', UserModel).actions(actions);