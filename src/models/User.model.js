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
			self.boards.set(board.id, board);
		},


		updateBoard({ id, title, description, tasks }) {
            self.boards.set(id, { ...self.boards.get(id), id, title, description });

            if(tasks) tasks.forEach((task)=> self.boards.get(id).updateTask(task));
		},


		deleteBoard(boardId) {
			// TODO: graphQL!
			self.boards.delete(boardId);
		}
	};
};


export default types.model('UserModel', UserModel).actions(actions);