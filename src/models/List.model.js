import { types } from 'mobx-state-tree';


const List = {
    id: types.identifier(types.string),
    name: types.maybe(types.string)
};

const actions = (self)=> {
    return {
    };
};


export default types.model('List', List).actions(actions);