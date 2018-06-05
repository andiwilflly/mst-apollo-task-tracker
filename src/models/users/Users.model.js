// MobX
import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Store
import store from "store";
// Models
import UserModel from "models/users/User.model";


const Users = {
	all: types.optional(types.map(UserModel), {})
};


let interval = null;
const actions = (self)=> {
	return {

		create(user = {}) {
			if(self.all.has(user.id)) return self.all.get(user.id).update(user);
			runInAction(`USER-CREATE-SUCCESS`, ()=> {
				self.all.set(user.id, { ...user, __type: "User" } );

				// Refresh online status of current [user]
				if(user.id !== store.authorizedUser.id) return;
				self.all.get(user.id).updateMutation({ id: user.id });
				interval = setInterval(()=> self.all.get(user.id).updateMutation({ id: user.id }), 30000);
			});
		}
	};
};


export default types.model('Users', Users).actions(actions);
