import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import CREATE_TASK_CUSTOM_MUTATION from "graphql/mutations/tasks/createTaskCustom.mutation";
import DELETE_TASK_CUSTOM_MUTATION from "graphql/mutations/tasks/deleteTaskCustom.mutation";
import UPDATE_TASK_RELATIONS_QUERY from "graphql/queries/tasks/updateTaskRelations.query";
// Models
import TaskModel from "models/tasks/Task.model";


const Tasks = {
	all: types.optional(types.map(TaskModel), {})
};


const actions = (self)=> {
    return {

		createMutation: ({ authorId, boardId, listId, title, description, labelsIds })=> {
			return client.mutate({
				variables: { authorId, boardId, listId, title, description, labelsIds },
				mutation: CREATE_TASK_CUSTOM_MUTATION
			});
		},


		deleteMutation: ({ taskId, userId, boardId, listId })=> {
			return client.mutate({
				variables: { taskId, userId, boardId, listId },
				mutation: DELETE_TASK_CUSTOM_MUTATION
			});
		},

        updateTaskRelations: ({ authorId, boardId, listId })=> {
            return client.query({
                variables: { authorId, boardId, listId },
                query: UPDATE_TASK_RELATIONS_QUERY
            });
        },


        create(task = {}) {
			if(self.all.has(task.id)) return self.all.get(task.id).update(task);
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
