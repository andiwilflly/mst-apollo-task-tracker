import {types, flow} from 'mobx-state-tree';


const Repository = {
	id: types.identifier(types.string),
	name: types.string,
	description: types.string,
	watchers: types.frozen
};


export default types.model("Repository", Repository);