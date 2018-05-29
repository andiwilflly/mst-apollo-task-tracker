import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import UPDATE_BOARD_RELATIONS_QUERY from "graphql/queries/boards/updateBoardRelations.query";


const Board = {
	id: types.identifier(types.string),
	name: types.maybe(types.string),
	description: types.maybe(types.string),
	author: types.frozen,
	lists: types.frozen,
	tasks: types.frozen
};


const actions = (self)=> {
    return {

		updateBoardRelations: ({ authorId })=> {
			return client.query({
				variables: { authorId },
				query: UPDATE_BOARD_RELATIONS_QUERY
			});
		},


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

		get authorId() { return self.author.id },

		get listIds() { return self.lists.map((list)=> list.id) },

		get taskIds() { return self.tasks.map((task)=> task.id) }
	};
};


export default types.model('Board', Board).actions(actions).views(views);
