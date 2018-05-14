import { types } from "mobx-state-tree";
// Models
import UserModel from "models/User.model";
import QueryModel from "models/Query.model";


const RootModel = {
	user: types.optional(types.maybe(UserModel), null),
	queries: types.map(QueryModel)
};


const actions = (store)=> {
	return {

		// Queries
		setQuery: (queryId)=> store.queries.set(queryId, { id: queryId })
	};
};


export default types.model(RootModel).actions(actions);