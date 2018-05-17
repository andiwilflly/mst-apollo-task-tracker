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
			if(!self.boards.has(board.id)) return console.log("ERROR!, board update");

			runInAction(`USER-UPDATE-BOARD-SUCCESS`, ()=> {
				const oldBoard = self.boards.get(board.id);
				const fieldNames = Object.keys(oldBoard);
				fieldNames.forEach((fieldName)=> {
					if(board[fieldName] === undefined) return;
					if(fieldName === "tasks") return board[fieldName].map((task)=> oldBoard.updateTask(task));
					oldBoard[fieldName] = board[fieldName];
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
