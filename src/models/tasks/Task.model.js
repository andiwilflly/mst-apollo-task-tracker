import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";


const Task = {
	id: types.identifier(types.string),
	title: types.maybe(types.string),
	description: types.maybe(types.string),
};

const actions = (self)=> {
    return {

		update(task = {}) {
			if(!self.tasks.has(task.id)) return console.log("Task ERRO!@");

			runInAction(`TASK-UPDATE-SUCCESS`, ()=> {
				const oldTask = self.tasks.get(task.id);
				Object.keys(oldTask).forEach((fieldName)=> {
					if(task[fieldName] !== undefined) oldTask[fieldName] = task[fieldName];
				});
			});
		}
    };
};


export default types.model('Task', Task).actions(actions);