import { types } from "mobx-state-tree";


const ModalModel = {
	isOpen: types.boolean,
	contentName: types.optional(types.maybe(types.string), ''),
	props: types.optional(types.frozen, {})
};


const actions = (self)=> {
	return {

		open(contentName = '', props = {}) {
			self.isOpen = true;
			self.contentName = contentName;
			self.props = props;
		},

		close() {
			self.isOpen = false;
			self.contentName = '';
			self.props = {};
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('ModalModel', ModalModel).actions(actions).views(views);