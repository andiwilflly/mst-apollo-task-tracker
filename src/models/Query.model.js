import {types, flow} from 'mobx-state-tree';


const Query = {
	id: types.identifier(types.string)
};


export default types.model("Query", Query);