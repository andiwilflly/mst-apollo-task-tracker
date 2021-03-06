import Alert from 'react-s-alert';
// @SOURCE: http://fusejs.io
import Fuse from 'fuse.js';
// MobX
import { runInAction, values } from "mobx";
import { types } from 'mobx-state-tree';
// Store
import store from "store";
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
			// Optimistic updates
			self.optimisticCreate({ authorId, boardId, listId, title, description, labelsIds });

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
            return client.mutate({
                variables: { id, authorId, boardId, listId },
                mutation: TASK_UPDATE_RELATIONS_MUTATION
			}).catch((e)=> console.log("TASK_UPDATE_RELATIONS_MUTATION", e));
        },


        create(task = {}) {
			if(self.all.has(task.id)) return self.all.get(task.id).update(task);
			runInAction(`TASK-CREATE-SUCCESS ${task.id}`, ()=> {
				self.all.set(task.id, { ...task, __type: "Task" } );
			});
		},


		delete(taskId) {
			if(!self.all.has(taskId)) return runInAction(`TASK-DELETE-WARNING (no such task ${taskId})`, ()=> {});
			runInAction(`TASK-DELETE-SUCCESS ${taskId}`, ()=> {
				self.all.delete(taskId);
				Alert.success("Task was deleted successfully!");
			});
		},


		search(text= "") {
			return fuse.search(text).map((result)=> result.item);
		},


		optimisticCreate({ id="optimisticUpdate", authorId, boardId, listId, title, description, createdAt=""+new Date() , labelsIds }) {

			if(id !== "optimisticUpdate") self.optimisticDelete("optimisticUpdate");

			runInAction(`TASK-OPTIMISTIC-CREATE-SUCCESS ${id}`, ()=> {
				const user = store.users.all.get(authorId);
				const board = store.boards.all.get(boardId);
				const list = store.lists.all.get(listId);
				user && user.update({
					id: authorId,
					tasks: [...user.tasks, { id }]
				});
				board && board.update({
					id: boardId,
					tasks: [...board.tasks, { id }]
				});
				list && list.update({
					id: listId,
					tasks: [...list.tasks, { id }]
				});
				store.tasks.create({
					id,
					title,
					description,
					createdAt,
					author: { id: authorId },
					board: { id: boardId },
					list: { id: listId },
					labels: labelsIds.map((labelId)=> ({ id: labelId })),
					comments: []
				});
			} );
		},


		optimisticDelete(taskId) {
			const task = store.tasks.all.get(taskId);
			if(!task) return runInAction(`TASK-OPTIMISTIC-DELETE-ERROR ${taskId}`, ()=> {});

			runInAction(`TASK-OPTIMISTIC-DELETE-SUCCESS ${taskId}`, ()=> {
				const user = store.users.all.get(task.authorId);
				const board = store.boards.all.get(task.boardId);
				const list = store.lists.all.get(task.listId);

				if(user) {
					let userTasksId = user.tasksIds;
					userTasksId.splice(userTasksId.indexOf(taskId), 1);

					user.update({
						id: task.authorId,
						tasks: userTasksId.map((taskId)=> ({ id: taskId }))
					});
				}

				if(board) {
					let boardTasksIds = board.tasksIds.slice();
					boardTasksIds.splice(boardTasksIds.indexOf(taskId), 1);
					board.update({
						id: task.boardId,
						tasks: boardTasksIds.map((taskId)=> ({ id: taskId }))
					});
				}

				if(list) {
					let listTasksIds = list.tasksIds.slice();
					listTasksIds.splice(listTasksIds.indexOf(taskId), 1);
					list.update({
						id: task.listId,
						tasks: listTasksIds.map((taskId)=> ({ id: taskId }))
					});
				}

				self.delete(taskId);
			});
		},


		// Hooks
		postProcessSnapshot(snapshot) {
			fuse = new Fuse(values(self.all), fuseOptions); // "list" is the item array
		}
    };
};


export default types.model('Tasks', Tasks).actions(actions);
