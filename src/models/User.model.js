import { types } from "mobx-state-tree";
// Models
import BoardModel from "models/Board.model";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	boards: types.optional(types.array(BoardModel), []),
};


const actions = (self)=> {
	return {
		setInfo: (data)=> {
			Object.keys(self).map((fieldName)=> self[fieldName] = data[fieldName]);
		}
	};
};


export default types.model('UserModel', UserModel).actions(actions);