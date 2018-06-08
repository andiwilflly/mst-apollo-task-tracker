import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";


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
				variables: comment,
				mutation: UPDATE_COMMENT_MUTATION
			}).catch((e)=> console.log("UPDATE_COMMENT_MUTATION", e));
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