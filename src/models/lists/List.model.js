import { types } from 'mobx-state-tree';
// Models
import TasksModel from "models/tasks/Tasks.model";

const List = {
    id: types.identifier(types.string),
    name: types.maybe(types.string),
    tasks: TasksModel
};

const actions = (self)=> {
    return {

        update(list) {

        }
    };
};


export default types.model('List', List).actions(actions);