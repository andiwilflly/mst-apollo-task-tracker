import { types } from "mobx-state-tree";


const ModalModel = {
	isOpen: types.boolean,
	content: types.frozen
};


const actions = (self)=> {
	return {

		open(content) {
			self.isOpen = true;
			self.content = content;
		},

		close() {
			self.isOpen = false;
			self.content = null;
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('ModalModel', ModalModel).actions(actions).views(views);