import { types } from "mobx-state-tree";


const ModalModel = {
	isOpen: types.boolean,
	content: types.optional(types.maybe(types.string), null),
	props: types.optional(types.frozen, {})
};


const actions = (self)=> {
	return {

		open(contentName = '', props = {}) {
			self.isOpen = true;
			self.content = contentName;
			self.props = props;
		},

		close() {
			self.isOpen = false;
			self.content = null;
			self.props = {};
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('ModalModel', ModalModel).actions(actions).views(views);