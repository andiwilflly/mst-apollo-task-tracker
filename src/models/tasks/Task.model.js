import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";
// GraphQL
import client from "graphql/client";
import UPDATE_TASK_CUSTOM_MUTATION from "graphql/mutations/tasks/updateTaskCustom.mutation";
import UPDATE_TASK_CUSTOM_RELATIONS_MUTATION from "graphql/mutations/tasks/updateTaskCustomRelations.mutation";


const Task = {
	id: types.identifier(types.string),
	__type: types.maybe(types.string),
	title: types.maybe(types.string),
	description: types.maybe(types.string),
	createdAt: types.maybe(types.string),
	author: types.frozen,
	board: types.frozen,
	list: types.frozen,
	comments: types.array(types.frozen),
	labels: types.array(types.frozen)
};

const actions = (self)=> {
    return {

    	updateMutation: (task={})=> {
			return client.mutate({
				variables: task,
				mutation: UPDATE_TASK_CUSTOM_MUTATION
			}).catch((e)=> console.log("UPDATE_TASK_CUSTOM_MUTATION", e));
		},


		updateTaskCustomRelations: (task={})=> {
			return client.mutate({
				variables: task,
				mutation: UPDATE_TASK_CUSTOM_RELATIONS_MUTATION
			}).catch((e)=> console.log("UPDATE_TASK_CUSTOM_RELATIONS_MUTATION", e));
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
		get createdTime() { return (new Date(self.createdAt)).getTime(); },
		get authorId() { return self.author.id },
		get boardId() { return self.board.id },
		get listId() { return self.list.id },
		get commentsIds() { return self.comments.map((comment)=> comment.id); },
		get labelsIds() { return self.labels.map((label)=> label.id); }
	};
};


export default types.model('Task', Task).actions(actions).views(views);