import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";
// Models
import ChatMsgModel from "models/chats/ChatMsg.model";
// GraphQL
import client from "graphql/client";
import CHAT_UPDATE_MUTATION from "graphql/mutations/chats/updateChat.mutation";
import CREATE_CHAT_MESSAGE_MUTATION from "graphql/mutations/chats/createChatMsg.mutation";


const Chat = {
    id: types.identifier(types.string),
    name: types.maybe(types.string),
	boardId: types.maybe(types.string),
	x: types.maybe(types.number),
	y: types.maybe(types.number),
	messages: types.optional(types.map(ChatMsgModel), {})
};


const actions = (self)=> {
    return {

		updateMutation: ({ id, x, y, name })=> {
			return client.mutate({
				variables: { id, x, y, name },
				mutation: CHAT_UPDATE_MUTATION
			}).catch((e)=> console.log("CHAT_UPDATE_MUTATION", e));
		},


        update(chat) {
			runInAction(`CHAT-UPDATE-SUCCESS ${chat.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(fieldName === "messages") return;
					if(chat[fieldName] !== undefined) self[fieldName] = chat[fieldName];
				});
			});
        },


        createMessageMutation({ chatId, authorId, text }) {
			return client.mutate({
				variables: { chatId, authorId, text },
				mutation: CREATE_CHAT_MESSAGE_MUTATION
			}).catch((e)=> console.log("CREATE_CHAT_MESSAGE_MUTATION " + e));
		},


		createMessage(message) {
			if(self.messages.has(message.id)) return self.messages.get(message.id).update(message);

			runInAction(`CHAT-MESSAGE-CREATE-SUCCESS ${message.id}`, ()=> {
        		self.messages.set(message.id, message);
			});
		}
    };
};


const views = (self)=> {
	return {
	};
};

export default types.model('Chat', Chat).actions(actions).views(views);