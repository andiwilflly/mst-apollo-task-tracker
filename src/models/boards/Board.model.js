import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import UPDATE_BOARD_RELATIONS_MUTATION from "graphql/mutations/boards/updateBoardRelations.mutation";


const Board = {
	id: types.identifier(types.string),
	__type: types.maybe(types.string),
	name: types.maybe(types.string),
	description: types.maybe(types.string),
	background: types.maybe(types.string),
	author: types.frozen,
	users: types.frozen,
	lists: types.frozen,
	tasks: types.frozen
};


const actions = (self)=> {
    return {

		updateBoardRelations: ({ authorId })=> {
			return client.mutate({
				variables: { authorId },
				mutation: UPDATE_BOARD_RELATIONS_MUTATION
			}).catch((e)=> console.log("UPDATE_BOARD_RELATIONS_MUTATION", e));
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
		get usersIds() { return self.users.map((user)=> user.id) },
		get listIds() { return self.lists.map((list)=> list.id) },
		get tasksIds() { return self.tasks.map((task)=> task.id) }
	};
};


export default types.model('Board', Board).actions(actions).views(views);
