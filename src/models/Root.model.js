import { types } from "mobx-state-tree";
// Models
import QueryModel from "models/Query.model";
import RepositoriesModel from "models/Repositories.model";
import RepositoryModel from "models/Repository.model";


const RootModel = {
	queries: types.map(QueryModel),
	repositories: types.map(RepositoryModel),
};

const repositories = RepositoriesModel.create({});

const actions = (store)=> {
	return {

		// Queries
		setQuery: (queryId)=> store.queries.set(queryId, { id: queryId }),

		// Repositories
		createRepository: (repository)=> repositories.createRepository(store, repository),
		createRepositories: (newRepositories)=> repositories.createRepositories(store, newRepositories)

	};
};


export default types.model(RootModel).actions(actions);