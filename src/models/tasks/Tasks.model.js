import Alert from 'react-s-alert';
// @SOURCE: http://fusejs.io
import Fuse from 'fuse.js';
// MobX
import { runInAction, values } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import TASK_CREATE_MUTATION from "graphql/mutations/tasks/createTask.mutation";
import TASK_DELETE_MUTATION from "graphql/mutations/tasks/deleteTask.mutation";
import TASK_UPDATE_RELATIONS_MUTATION from "graphql/mutations/tasks/updateTaskRelations.mutation";
// Models
import TaskModel from "models/tasks/Task.model";


const Tasks = {
	all: types.optional(types.map(TaskModel), {})
};


let fuse = null;
const fuseOptions = {
	shouldSort: true,
	includeScore: true,
	threshold: 0.3,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 2,
	keys: [
		"id",
		"title",
		"description"
	]
};

const actions = (self)=> {
    return {

		createMutation: ({ authorId, boardId, listId, title, description, labelsIds })=> {
			return client.mutate({
				variables: { authorId, boardId, listId, title, description, labelsIds },
				mutation: TASK_CREATE_MUTATION
			}).catch((e)=> console.log("TASK_CREATE_MUTATION", e));
		},


		deleteMutation: ({ taskId })=> {
			return client.mutate({
				variables: { taskId },
				mutation: TASK_DELETE_MUTATION
			}).catch((e)=> console.log("TASK_DELETE_MUTATION", e));
		},


        updateTaskRelations: ({ id, authorId, boardId, listId })=> {
			console.log( id, authorId, boardId, listId, 4242);
            return client.mutate({
                variables: { id, authorId, boardId, listId },
                mutation: TASK_UPDATE_RELATIONS_MUTATION
			}).catch((e)=> console.log("TASK_UPDATE_RELATIONS_MUTATION", e));
        },


        create(task = {}) {
			if(self.all.has(task.id)) return self.all.get(task.id).update(task);
			runInAction(`TASK-CREATE-SUCCESS`, ()=> {
				self.all.set(task.id, { ...task, __type: "Task" } );
			});
		},


		delete(taskId) {
			if(!self.all.has(taskId)) return runInAction(`TASK-DELETE-WARNING (no such task ${taskId})`, ()=> {});
			runInAction(`TASK-DELETE-SUCCESS`, ()=> {
				self.all.delete(taskId);
				Alert.success("Task was deleted successfully!");
			});
		},


		search(text= "") {
			return fuse.search(text).map((result)=> result.item);
		},


		// Hooks
		postProcessSnapshot(snapshot) {
			fuse = new Fuse(values(self.all), fuseOptions); // "list" is the item array
		}
    };
};


export default types.model('Tasks', Tasks).actions(actions);
