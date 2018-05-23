import { types } from "mobx-state-tree";
import { runInAction } from "mobx";


const FiltersModel = {
	byLabels: types.array(types.maybe(types.string))
};


const actions = (self)=> {
	return {
		setFilter(filterName, filterValue) {
			if(self[filterName].includes(filterValue)) return;
			runInAction(`FILTERS-SET-FILTER-SUCCESS [${filterName}: ${filterValue}]`, ()=> {
				self[filterName].push(filterValue);
			});
		},

		resetFilter(filterName, filterValue) {
			runInAction(`FILTERS-UNSET-FILTER-SUCCESS [${filterName}: ${filterValue}]`, ()=> {
				self[filterName].remove(filterValue);
			});
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('FiltersModel', FiltersModel).actions(actions).views(views);