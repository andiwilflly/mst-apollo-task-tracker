import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import USER_UPDATE_MUTATION from "graphql/mutations/user/updateUser.mutation";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	boards: types.frozen,
	tasks: types.frozen
};


const actions = (self)=> {
	return {

		setInfo: (data)=> {
            runInAction(`USER-SET-INFO-SUCCESS`, ()=>
				Object.keys(self).forEach(fieldName => {
                    if(data[fieldName] !== undefined) self[fieldName] = data[fieldName];
				}))
		},


		updateMutation: ({ id, email })=> {
			client.mutate({
				variables: { email, id },
				mutation: USER_UPDATE_MUTATION
			});
		},


		update(newUser) {
            runInAction(`USER-UPDATE-SUCCESS`, ()=> {
                Object.keys(newUser).forEach((fieldName)=> {
                    if(fieldName === 'tasks' || fieldName === 'boards') {
                        if(newUser[fieldName] !== undefined) self[fieldName] = newUser[fieldName];
                    }
                });
            });
		}
	};
};


const views = (self)=> {
	return {
		get boardIds() { return self.boards.map((board)=> board.id) }
	};
};


export default types.model('UserModel', UserModel).actions(actions).views(views);