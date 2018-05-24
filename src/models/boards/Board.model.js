import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';


const Board = {
	id: types.identifier(types.string),
	name: types.maybe(types.string),
	description: types.maybe(types.string),
	lists: types.frozen,
	tasks: types.frozen
};


const actions = (self)=> {
    return {

		update(board) {
			runInAction(`BOARD-UPDATE-SUCCESS ${board.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(board[fieldName] !== undefined) self[fieldName] = board[fieldName];
				});
			});
		}
    };
};


const views = (self)=> {
	return {

		get listIds() { return self.lists.map((list)=> list.id) },

		get taskIds() { return self.tasks.map((task)=> task.id) }
	};
};


export default types.model('Board', Board).actions(actions).views(views);
