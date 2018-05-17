import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// Models
import BoardModel from "models/boards/Board.model";
import ListsModel from "models/lists/Lists.model";
import TasksModel from "models/tasks/Tasks.model";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	boards: types.optional(types.map(BoardModel), {}),
	lists: types.optional(types.map(ListsModel), {}),
	tasks: types.optional(types.map(TasksModel), {}),
};


const actions = (self)=> {
	return {

		setInfo: (data)=> {
			Object.keys(self).forEach((fieldName)=> {
				if(fieldName === "boards") {
					data[fieldName].map((board)=> self.updateBoard(board));
				} else {
					self[fieldName] = data[fieldName];
				}
			});
		}
	};
};


export default types.model('UserModel', UserModel).actions(actions);