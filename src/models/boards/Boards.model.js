import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import BoardModel from "models/boards/Board.model";


const Boards = {
	all: types.optional(types.map(BoardModel), {})
};


const actions = (self)=> {
    return {

		createBoard(board = {}) {
			runInAction(`BOARD-CREATE-SUCCESS`, ()=> {
				self.boards.set(board.id, board);
			});
		},


		deleteBoard(boardId) {
			// TODO: graphQL!
			runInAction(`BOARD-DELETE-SUCCESS`, ()=> {
				self.boards.delete(boardId);
			});
		}
    };
};


export default types.model('Boards', Boards).actions(actions);
