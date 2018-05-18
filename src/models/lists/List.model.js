import { types } from 'mobx-state-tree';


const List = {
    id: types.identifier(types.string),
    name: types.maybe(types.string),
    board: types.frozen,
    tasks: types.frozen
};

const actions = (self)=> {
    return {

        update(list) {

        }
    };
};



const views = (self)=> {
	return {
		get boardId() { return self.board.id },
		get taskIds() { return self.tasks.map((task)=> task.id); }
	};
};

export default types.model('List', List).actions(actions).views(views);