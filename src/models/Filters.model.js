import { types } from "mobx-state-tree";


const FiltersModel = {
	byLabels: types.array(types.maybe(types.string))
};


const actions = (self)=> {
	return {
		setFilter(filterName, filterValue) {
			if(!self[filterName].includes(filterValue)) self[filterName].push(filterValue);
		},

		resetFilter(filterName, filterValue) {
			self[filterName].remove(filterValue);
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('FiltersModel', FiltersModel).actions(actions).views(views);