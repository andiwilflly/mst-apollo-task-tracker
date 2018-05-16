import { types } from 'mobx-state-tree';


const Task = {
	id: types.identifier(types.string),
	title: types.maybe(types.string),
	description: types.maybe(types.string),
};

const actions = (self)=> {
    return {
    };
};


export default types.model('Task', Task).actions(actions);