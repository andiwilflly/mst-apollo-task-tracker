import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
// Models
import ListModel from "models/lists/List.model";
// GraphQL
import CREATE_LIST_MUTATION from "graphql/mutations/lists/createList.mutation";


const Lists = {
	all: types.optional(types.map(ListModel), {})
};

const actions = (self)=> {
    return {

        createMutation: async ({ boardId, name } = {})=> {
            await client.mutate({
                variables: { boardId, name },
                mutation: CREATE_LIST_MUTATION
            });
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
