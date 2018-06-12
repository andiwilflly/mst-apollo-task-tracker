import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";


const ChatMsg = {
	id: types.identifier(types.string),
	text: types.maybe(types.string),
	createdAt: types.maybe(types.string),
	authorId: types.maybe(types.string),
	chat: types.frozen
};

const actions = (self)=> {
	return {

		update(message) {
			runInAction(`CHAT-MSG-UPDATE-SUCCESS ${message.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(message[fieldName] !== undefined) self[fieldName] = message[fieldName];
				});
			});
		}
	};
};


const views = (self)=> {
	return {
		get createdTime() { return (new Date(self.createdAt)).getTime(); },
		get chatId() { return self.chat.id; }
	};
};

export default types.model('ChatMsg', ChatMsg).actions(actions).views(views);