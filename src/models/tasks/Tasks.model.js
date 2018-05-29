import Alert from 'react-s-alert';
// @SOURCE: http://fusejs.io
import Fuse from 'fuse.js';
// MobX
import { runInAction, values } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import CREATE_TASK_MUTATION from "graphql/mutations/tasks/createTask.mutation";
import DELETE_TASK_MUTATION from "graphql/mutations/tasks/deleteTask.mutation";
import UPDATE_TASK_RELATIONS_QUERY from "graphql/queries/tasks/updateTaskRelations.query";
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
				mutation: CREATE_TASK_MUTATION
			}).catch((e)=> console.log("CREATE_TASK_MUTATION", e));
		},


		deleteMutation: ({ taskId, userId, boardId, listId })=> {
			return client.mutate({
				variables: { taskId, userId, boardId, listId },
				mutation: DELETE_TASK_MUTATION
			}).catch((e)=> console.log("DELETE_TASK_MUTATION", e));
		},

        updateTaskRelations: ({ id, authorId, boardId, listId })=> {
            return client.query({
                variables: { id, authorId, boardId, listId },
                query: UPDATE_TASK_RELATIONS_QUERY
			}).catch((e)=> console.log("UPDATE_TASK_RELATIONS_QUERY", e));
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
