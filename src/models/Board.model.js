import { types } from 'mobx-state-tree';


const Board = {
	id: types.identifier(types.string),
	name: types.maybe(types.string),
	description: types.maybe(types.string)
};


export default types.model("Board", Board);