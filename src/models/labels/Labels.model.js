import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import LabelModel from "models/labels/Label.model";


const Labels = {
	all: types.optional(types.map(LabelModel), {})
};

const actions = (self)=> {
	return {

		createMutation: async ({ boardId, name } = {})=> {
			// const response = await client.mutate({
			// 	variables: { boardId, name },
			// 	mutation: CREATE_LIST_MUTATION
			// });
			//
			// runInAction(`LIST-CREATE-SUCCESS`, ()=>
			// 	self.all.set(response.id, {
			// 		id: response.id,
			// 		name: response.name
			// 	})
			// );
		},


		create(label) {
			if(self.all.has(label.id)) return self.all.get(label.id).update(label);

			runInAction(`LABEL-CREATE-SUCCESS`, ()=> {
				self.all.set(label.id, label);
			});
		},


		delete(labelId) {
			runInAction(`LABEL-DELETE-SUCCESS`, ()=> {
				self.all.delete(labelId);
			});
		}
	};
};


export default types.model('Labels', Labels).actions(actions);
