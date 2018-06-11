import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";
// GraphQL
import client from "graphql/client";
// Mutations
import UPDATE_COMMENT_CUSTOM_MUTATION from "graphql/mutations/comments/updateCommentCustom.mutation";


const Comment = {
    id: types.identifier(types.string),
    text: types.maybe(types.string),
	createdAt: types.maybe(types.string),
    author: types.frozen,
    task: types.frozen
};

const actions = (self)=> {
    return {

        update(comment) {
			runInAction(`COMMENT-UPDATE-SUCCESS ${comment.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(comment[fieldName] !== undefined) self[fieldName] = comment[fieldName];
				});
			});
        },


		updateMutation: (comment={})=> {
			return client.mutate({
				variables: {
					id: comment.id,
					text: comment.text,
					authorId: comment.author.id,
					taskId: comment.task.id
				},
				mutation: UPDATE_COMMENT_CUSTOM_MUTATION
			}).catch((e)=> console.log("UPDATE_COMMENT_CUSTOM_MUTATION", e));
		},
    };
};



const views = (self)=> {
	return {
		get createdTime() { return (new Date(self.createdAt)).getTime(); },
		get authorId() { return self.author.id },
		get taskId() { return self.task.id }
	};
};

export default types.model('Comment', Comment).actions(actions).views(views);