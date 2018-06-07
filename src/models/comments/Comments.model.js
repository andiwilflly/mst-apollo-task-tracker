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
            // Optimistic updates
            self.optimisticCreate({ text, authorId, taskId });

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


		create(comment) {
			if(self.all.has(comment.id)) return self.all.get(comment.id).update(comment);

            runInAction(`COMMENT-CREATE-SUCCESS ${comment.id}`, ()=> {
               self.all.set(comment.id, comment);
            });
		},


        delete(commentId) {
            runInAction(`COMMENT-DELETE-SUCCESS ${commentId}`, ()=> {
                self.all.delete(commentId);
            });
        },


        optimisticCreate({ id="optimisticUpdate", text, authorId, taskId }) {
            if(id !== "optimisticUpdate") self.optimisticDelete("optimisticUpdate");

            runInAction(`COMMENTS-OPTIMISTIC-CREATE-SUCCESS ${id}`, ()=> {
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
                const task = store.tasks.all.get(comment.taskId);

                if(user) {
                    let commentsIds = user.commentsIds.slice();
                    commentsIds.splice(commentsIds.indexOf(commentId), 1);
                    user.update({
                        id: comment.authorId,
                        comments: commentsIds.map((commentId)=> ({ id: commentId }))
                    });
                }

                if(task) {
                    let commentsIds = task.commentsIds.slice();
                    commentsIds.splice(commentsIds.indexOf(commentId), 1);
                    task.update({
                        id: comment.taskId,
                        comments: commentsIds.map((commentId)=> ({ id: commentId }))
                    });
                }

                self.delete(commentId);
            });
        }
    }
};


export default types.model('Comments', Comments).actions(actions);
