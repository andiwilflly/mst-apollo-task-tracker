import {types, flow} from 'mobx-state-tree';
import { runInAction } from 'mobx';



const RepositoriesModel = types
	.model('RepositoriesModel', {
	})
	.actions(self=> {

		const createRepository = (store, repository)=> {
			if(store.repositories.get(repository.id)) console.log(repository, 42);
			store.repositories.set(repository.id, {
				...store.repositories.get(repository.id),

				id: repository.id,
				name: repository.name,
				description: repository.description || "",
				watchers: repository.watchers || {}
			});
		};

		const createRepositories = (store, repositories) =>
			runInAction(() =>
				repositories.forEach(repository => createRepository(store, repository))
			);

			return { createRepository, createRepositories };
	});


export default RepositoriesModel;