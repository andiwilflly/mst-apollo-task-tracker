import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Store
import store from "store";
// Models
import CommentModel from "models/comments/Comment.model";
// GraphQL
import client from "graphql/client";
import COMMENT_CREATE_MUTATION from "graphql/mutations/comments/createComment.mutation";
import COMMENT_DELETE_MUTATION from "graphql/mutations/comments/deleteComment.mutation";


const Comments = {
	all: types.optional(types.map(CommentModel), {})
};

const actions = (self)=> {
    return {

        createMutation: ({ authorId, taskId, text } = {})=> {
            self.optimisticCreate({ authorId, taskId, text });

			return client.mutate({
                variables: { authorId, taskId, text },
                mutation: COMMENT_CREATE_MUTATION
			}).catch((e)=> console.log("COMMENT_CREATE_MUTATION", e));
		},


		deleteMutation: async ({ commentId })=> {
			return client.mutate({
				variables: { commentId },
				mutation: COMMENT_DELETE_MUTATION
			}).catch((e)=> console.log("COMMENT_DELETE_MUTATION", e));
		},


		create(list) {
			if(self.all.has(list.id)) return self.all.get(list.id).update(list);

            runInAction(`COMMENT-CREATE-SUCCESS`, ()=> {
               self.all.set(list.id, list);
            });
		},


        delete(listId) {
            runInAction(`COMMENT-DELETE-SUCCESS`, ()=> {
                self.all.delete(listId);
            });
        },


        optimisticCreate({ id="optimisticUpdate", text, authorId, taskId }) {
            if(id !== "optimisticUpdate") self.optimisticDelete("optimisticUpdate");

            runInAction(`TASK-OPTIMISTIC-CREATE-SUCCESS ${id}`, ()=> {
                const user = store.users.all.get(authorId);
                const task = store.tasks.all.get(taskId);

                user && user.update({
                    id: authorId,
                    comments: [...user.comments, { id }]
                });

                task && task.update({
                    id: taskId,
                    comments: [...task.comments, { id }]
                });

                store.comments.create({
                    id,
                    text,
                    author: { id: authorId },
                    task: { id: taskId }
                });
            });
        },


        optimisticDelete(commentId) {
            const comment = store.comments.all.get(commentId);
            if(!comment) return runInAction(`COMMENT-OPTIMISTIC-DELETE-ERROR ${commentId}`, ()=> {});

            runInAction(`COMMENT-OPTIMISTIC-DELETE-SUCCESS ${commentId}`, ()=> {
                const user = store.users.all.get(comment.authorId);
                const task = store.lists.all.get(comment.taskId);

                if(user) {
                    let userCommentsIds = user.commentsIds.slice();
                    userCommentsIds.splice(userCommentsIds.indexOf(commentId), 1);

                    // console.log('%%---> userCommentsIds', userCommentsIds)
                    // console.log('%%---> mapped', userCommentsIds.map((userCommentsId)=> ({ id: userCommentsId })))

                    user.update({
                        id: user.id,
                        comments: userCommentsIds.map((userCommentsId)=> ({ id: userCommentsId }))
                    });
                }

                if(task) {
                    let tasksIds = task.tasksIds.slice();
                    tasksIds.splice(tasksIds.indexOf(comment.taskId), 1);
                    task.update({
                        id: task.id,
                        tasks: tasksIds.map((taskId)=> ({ id: taskId }))
                    });
                }

                self.delete(commentId);
            });

        }
    }
};


export default types.model('Comments', Comments).actions(actions);
