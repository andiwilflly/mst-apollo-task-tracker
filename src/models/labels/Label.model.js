import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";


const Label = {
    id: types.identifier(types.string),
    color: types.maybe(types.string),
    tasks: types.array(types.frozen)
};

const actions = (self)=> {

    return {
        update(label) {
			runInAction(`LABEL-UPDATE-SUCCESS`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(label[fieldName] !== undefined) self[fieldName] = label[fieldName];
				});
			});
        }

    };
};


const views = (self)=> {
	return {
		get tasksIds() { return self.tasks.map((task)=> task.id); }
	};
};

export default types.model('Label', Label).actions(actions).views(views);