import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import ListModel from "models/lists/List.model";


const Lists = {
	all: types.optional(types.map(ListModel), {})
};


const actions = (self)=> {
    return {

		createList(list = {}) {
			runInAction(`LIST-CREATE-SUCCESS`, ()=> {
				//self.boards.set(board.id, board);
			});
		},


		deleteList(listId) {
			// TODO: graphQL!
			runInAction(`LIST-DELETE-SUCCESS`, ()=> {
				//self.boards.delete(boardId);
			});
		}
    };
};


export default types.model('Lists', Lists).actions(actions);
