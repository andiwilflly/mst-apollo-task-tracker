import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import ListModel from "models/lists/List.model";
// GraphQL
import client from "graphql/client";
import LIST_CREATE_MUTATION from "graphql/mutations/lists/createList.mutation";
import LIST_DELETE_MUTATION from "graphql/mutations/lists/deleteList.mutation";


const Lists = {
	all: types.optional(types.map(ListModel), {})
};

const actions = (self)=> {
    return {

        createMutation: ({ boardId, name } = {})=> {
			return client.mutate({
                variables: { boardId, name },
                mutation: LIST_CREATE_MUTATION
			}).catch((e)=> console.log("LIST_CREATE_MUTATION", e));
		},


		deleteMutation: async ({ listId })=> {
			return client.mutate({
				variables: { listId },
				mutation: LIST_DELETE_MUTATION
			}).catch((e)=> console.log("LIST_DELETE_MUTATION", e));
		},


		create(list) {
			if(self.all.has(list.id)) return self.all.get(list.id).update(list);

            runInAction(`LIST-CREATE-SUCCESS`, ()=> {
               self.all.set(list.id, list);
            });
		},


        delete(listId) {
            runInAction(`LISTS-DELETE-SUCCESS`, ()=> {
                self.all.delete(listId);
            });
        }
    };
};


export default types.model('Lists', Lists).actions(actions);
