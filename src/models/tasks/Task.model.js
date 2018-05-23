import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";
// GraphQL
import client from "graphql/client";
import UPDATE_TASK_CUSTOM_MUTATION from "graphql/mutations/tasks/updateTaskCustom.mutation";


const Task = {
	id: types.identifier(types.string),
	title: types.maybe(types.string),
	description: types.maybe(types.string),
	author: types.frozen,
	board: types.frozen,
	list: types.frozen,
	labels: types.array(types.frozen)
};

const actions = (self)=> {
    return {


    	updateMutation: async (task={})=> {
			return await client.mutate({
				variables: task,
				mutation: UPDATE_TASK_CUSTOM_MUTATION
			});
		},


		update(task={}) {
			runInAction(`TASK-UPDATE-SUCCESS`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(task[fieldName] !== undefined) self[fieldName] = task[fieldName];
				});
			});
		}
    };
};


const views = (self)=> {
	return {
		get authorId() { return self.author.id },
		get boardId() { return self.board.id },
		get listId() { return self.list.id },
		get labelsIds() { return self.labels.map((label)=> label.id); }
	};
};


export default types.model('Task', Task).actions(actions).views(views);