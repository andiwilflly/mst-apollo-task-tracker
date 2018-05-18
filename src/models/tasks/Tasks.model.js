import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import USER_UPDATE_MUTATION from "graphql/mutations/user/updateUser.mutation";
import CREATE_TASK_MUTATION from "graphql/mutations/tasks/createTask.mutation";
import DELETE_TASK_MUTATION from "graphql/mutations/tasks/deleteTask.mutation";
// Models
import TaskModel from "models/tasks/Task.model";


const Tasks = {
	all: types.optional(types.map(TaskModel), {})
};


const actions = (self)=> {
    return {

		createMutation: async ({ authorId, boardId, listId, title, description })=> {
			const response = await client.mutate({
				variables: { authorId, boardId, listId, title, description },
				mutation: CREATE_TASK_MUTATION
			});
			console.log("createTask mutation: ", response);
			self.create(response.data.createTask);
		},


		deleteMutation: (taskId)=> {
			client.mutate({
				variables: { taskId },
				mutation: DELETE_TASK_MUTATION
			});
			// TESTING
			client.mutate({
				variables: { email: "wtf@i.ua", id: "cjhab8inhns0g0160ivthcp3f" },
				mutation: USER_UPDATE_MUTATION
			});
		},


		create(task = {}) {
			runInAction(`TASK-CREATE-SUCCESS`, ()=> {
				self.all.set(task.id, task);
			});
		},


		delete(taskId) {
			runInAction(`TASK-DELETE-SUCCESS`, ()=> {
				self.all.delete(taskId);
			});
		}

    };
};


export default types.model('Tasks', Tasks).actions(actions);
