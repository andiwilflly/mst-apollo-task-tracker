import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
import TaskModel from 'models/Task.model'

const Board = {
	id: types.identifier(types.string),
	name: types.maybe(types.string),
	description: types.maybe(types.string),
    tasks: types.optional(types.map(TaskModel), {}),
};

const actions = (self)=> {
    return {

		createTask(task = {}) {
			runInAction(`BOARD-CREATE-TASK-SUCCESS`, ()=> {
				self.tasks.set(task.id, task);
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
