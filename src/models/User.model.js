import { runInAction } from "mobx";
import { types } from "mobx-state-tree";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	boards: types.frozen
};


const actions = (self)=> {
	return {

		setInfo: (data)=> {
			Object.keys(self).forEach((fieldName)=> {
				if(fieldName === "boards") return self[fieldName] = data[fieldName].map((board)=> board.id);
				self[fieldName] = data[fieldName];
			});
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('UserModel', UserModel).actions(actions);