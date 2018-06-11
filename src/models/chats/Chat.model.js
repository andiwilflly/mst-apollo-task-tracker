import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";
// Models
import ChatMsgModel from "models/chats/ChatMsg.model";


const Chat = {
    id: types.identifier(types.string),
    name: types.maybe(types.string),
	board: types.maybe(types.string),
	messages: types.optional(types.map(ChatMsgModel), {})
};

const actions = (self)=> {
    return {

        update(chat) {
			runInAction(`CHAT-UPDATE-SUCCESS ${chat.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(chat[fieldName] !== undefined) self[fieldName] = chat[fieldName];
				});
			});
        }
    };
};


const views = (self)=> {
	return {
		get boardId() { return self.board.id }
	};
};

export default types.model('Chat', Chat).actions(actions).views(views);