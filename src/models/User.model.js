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
				self[fieldName] = data[fieldName];
			});
		}
	};
};


const views = (self)=> {
	return {
		get boardIds() { return self.boards.map((board)=> board.id) }
	};
};


export default types.model('UserModel', UserModel).actions(actions).views(views);