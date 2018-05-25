// MobX
import { runInAction, values } from "mobx";
import { types } from 'mobx-state-tree';

// Models
import UserModel from "models/users/User.model";


const Users = {
	all: types.optional(types.map(UserModel), {})
};


const actions = (self)=> {
	return {

		create(user = {}) {
			if(self.all.has(user.id)) return self.all.get(user.id).update(user);
			runInAction(`USER-CREATE-SUCCESS`, ()=> {
				self.all.set(user.id, { ...user, __type: "User" } );
			});
		}
	};
};


export default types.model('Users', Users).actions(actions);
