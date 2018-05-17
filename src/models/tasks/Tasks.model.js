import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import TaskModel from "models/tasks/Task.model";


const Tasks = {
	all: types.optional(types.map(TaskModel), {})
};


const actions = (self)=> {
    return {

		createTask(task = {}) {
			runInAction(`BOARD-CREATE-SUCCESS`, ()=> {
				//self.boards.set(board.id, board);
			});
		},


		deleteTask(taskId) {
			// TODO: graphQL!
			runInAction(`BOARD-DELETE-SUCCESS`, ()=> {
				//self.boards.delete(boardId);
			});
		}
    };
};


export default types.model('Tasks', Tasks).actions(actions);
