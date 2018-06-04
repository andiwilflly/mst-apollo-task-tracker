import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
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
        }
    };
};


export default types.model('Comments', Comments).actions(actions);
