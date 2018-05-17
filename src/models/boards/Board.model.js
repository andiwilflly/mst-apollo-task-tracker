import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';


const Board = {
	id: types.identifier(types.string),
	name: types.maybe(types.string),
	description: types.maybe(types.string)
};


const actions = (self)=> {
    return {

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



		createTask(task = {}) {
			runInAction(`BOARD-CREATE-TASK-SUCCESS`, ()=> {
				self.tasks.set(task.id, task);
			});
		},

        createList(list = {}) {
            runInAction(`BOARD-CREATE-LIST-SUCCESS`, ()=> {
                self.lists.set(list.id, list);
            });
        },


        updateTask(task = {}) {
    		if(!self.tasks.has(task.id)) return self.createTask(task);

			runInAction(`BOARD-UPDATE-TASK-SUCCESS`, ()=> {
				const oldTask = self.tasks.get(task.id);
				Object.keys(oldTask).forEach((fieldName)=> {
					if(task[fieldName] !== undefined) oldTask[fieldName] = task[fieldName];
				});
			});
        },


        deleteTask(taskId) {
			runInAction(`BOARD-DELETE-TASK-SUCCESS`, ()=> {
				self.tasks.delete(taskId);
			});
        }
    };
};


export default types.model('Board', Board).actions(actions);
