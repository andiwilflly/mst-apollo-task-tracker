import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// Models
import BoardModel from "models/Board.model";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	boards: types.optional(types.map(BoardModel), {}),
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
		},


		createBoard(board = {}) {
			runInAction(`USER-CREATE-BOARD-SUCCESS`, ()=> {
				self.boards.set(board.id, board);
			});
		},


		updateBoard(board) {
			if(!self.boards.has(board.id)) return self.createBoard(board);

			runInAction(`USER-UPDATE-BOARD-SUCCESS`, ()=> {
				const oldBoard = self.boards.get(board.id);
				const fieldNames = Object.keys(oldBoard);
				fieldNames.forEach((fieldName)=> {
					if(board[fieldName] === undefined) return;
					if(fieldName === "tasks") return board[fieldName].map((task)=> oldBoard.updateTask(task));
					oldBoard[fieldName] = board[fieldName];
				});
			});
		},


		deleteBoard(boardId) {
			// TODO: graphQL!
			self.boards.delete(boardId);
		}
	};
};


export default types.model('UserModel', UserModel).actions(actions);