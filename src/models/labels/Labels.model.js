import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import LabelModel from "models/labels/Label.model";
// GraphQL
import client from "graphql/client";
import CREATE_LABEL_MUTATION from "graphql/mutations/labels/createLabel.mutation";


const Labels = {
	all: types.optional(types.map(LabelModel), {})
};

const actions = (self)=> {
	return {

		createMutation: ({ color } = {})=> {
			client.mutate({
				variables: { color },
				mutation: CREATE_LABEL_MUTATION
			});
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
