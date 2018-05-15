import { types } from 'mobx-state-tree';


const Board = {
	id: types.identifier(types.string)
};


export default types.model("Board", Board);