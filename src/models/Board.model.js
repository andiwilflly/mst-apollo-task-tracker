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
        updateTask({id, title, description}) {
            self.tasks.set(id, { ...self.tasks.get(id), id, title, description });
        },


        deleteTask(taskId) {
            self.tasks.delete(taskId);
        }
    };
};


export default types.model('Board', Board).actions(actions);
