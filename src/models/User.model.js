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
			Object.keys(self).map((fieldName)=> {
				if(fieldName === "boards") {
					data[fieldName].map((board)=> self.createBoard(board));
				} else {
					self[fieldName] = data[fieldName];
				}
			});
		},

		createBoard(board = {}) {
			self.boards.set(board.id, board);
		},


		updateBoard(board = {}) {
			self.boards.set(board.id, { ...self.boards.get(board.id), ...board });
		},

		deleteBoard(boardId) {
			// TODO: graphQL!
			self.boards.delete(boardId);
		}
	};
};


export default types.model('UserModel', UserModel).actions(actions);