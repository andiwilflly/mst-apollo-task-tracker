import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import CREATE_BOARD_MUTATION from "graphql/mutations/boards/createBoard.mutation";
// Models
import BoardModel from "models/boards/Board.model";


const Boards = {
	all: types.optional(types.map(BoardModel), {})
};


const actions = (self)=> {
    return {

    	creteMutation: async ({ authorId, name, description })=> {
			const response = await client.mutate({
				variables: { authorId, name, description },
				mutation: CREATE_BOARD_MUTATION
			});
			console.log("creteMutation mutation: ", response);
			self.create(response.data.createBoard);
			// TODO: Redirect?
		},


		create(board = {}) {
			runInAction(`BOARD-CREATE-SUCCESS`, ()=> {
				self.all.set(board.id, board);
			});
		},


		delete(boardId) {
			// TODO: graphQL!
			runInAction(`BOARD-DELETE-SUCCESS`, ()=> {
				self.all.delete(boardId);
			});
		}
    };
};


export default types.model('Boards', Boards).actions(actions);
