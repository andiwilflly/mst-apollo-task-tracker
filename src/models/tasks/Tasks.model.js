import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import TaskModel from "models/tasks/Task.model";


const Tasks = {
	all: types.optional(types.map(TaskModel), {})
};


const actions = (self)=> {
    return {

		create(task = {}) {
			runInAction(`TASK-CREATE-SUCCESS`, ()=> {
				self.tasks.set(task.id, task);
			});
		},


		delete(taskId) {
			runInAction(`TASK-DELETE-SUCCESS`, ()=> {
				self.tasks.delete(taskId);
			});
		}

    };
};


export default types.model('Tasks', Tasks).actions(actions);
