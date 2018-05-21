import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";


const List = {
    id: types.identifier(types.string),
    name: types.maybe(types.string),
    board: types.frozen,
    tasks: types.array(types.frozen)
};

const actions = (self)=> {
    return {

        update(list) {
			console.log("update List", list);
			runInAction(`LIST-UPDATE-SUCCESS`, ()=> {

			});
        },


		addTaskId(taskId) {
        	self.tasks.push({ id: taskId });
		},


		removeTaskId(taskId) {
        	const removeTaskId = self.tasks.find((task)=> task.id === taskId);
			console.log(removeTaskId, "424242");
			self.tasks.remove(removeTaskId);
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