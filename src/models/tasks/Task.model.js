import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";
// GraphQL
import client from "graphql/client";
import UPDATE_TASK_MUTATION from "graphql/mutations/tasks/updateTask.mutation";


const Task = {
	id: types.identifier(types.string),
	title: types.maybe(types.string),
	description: types.maybe(types.string),
	author: types.frozen,
	board: types.frozen,
	list: types.frozen
};

const actions = (self)=> {
    return {


    	updateMutation: async (task={})=> {
    		console.log("task", task);
			return await client.mutate({
				variables: task,
				mutation: UPDATE_TASK_MUTATION
			});
		},


		update(task={}) {
			runInAction(`TASK-UPDATE-SUCCESS`, ()=> {
				const oldTask = self.tasks.get(task.id);
				Object.keys(oldTask).forEach((fieldName)=> {
					if(task[fieldName] !== undefined) oldTask[fieldName] = task[fieldName];
				});
			});
		}
    };
};


const views = (self)=> {
	return {
		get authorId() { return self.author.id },
		get boardId() { return self.board.id },
		get listId() { return self.list.id }
	};
};


export default types.model('Task', Task).actions(actions).views(views);