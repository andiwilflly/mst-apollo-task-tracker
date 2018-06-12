import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import ChatModel from "models/chats/Chat.model";
// Socket
import webSocket from 'graphql/websocket';
// GraphQL
import client from "graphql/client";
import CHAT_CREATE_MUTATION from "graphql/mutations/chats/createChat.mutation";
import CHAT_ON_MESSAGE_CREATE_SUBSCRIPTION from "graphql/subscriptions/chats/chatOnMsgCreate.subscription";


const Chats = {
	all: types.optional(types.map(ChatModel), {})
};

const actions = (self)=> {
	return {

		createMutation: ({ boardId, name })=> {
			return client.mutate({
				variables: { boardId, name },
				mutation: CHAT_CREATE_MUTATION
			}).catch((e)=> console.log("CHAT_CREATE_MUTATION", e));
		},


		create(chat) {
			if(self.all.has(chat.id)) return self.all.get(chat.id).update(chat);

			// Subscribe to all [users]
			webSocket.send(CHAT_ON_MESSAGE_CREATE_SUBSCRIPTION({ chatId: chat.id }));

			runInAction(`CHAT-CREATE-SUCCESS ${chat.id}`, ()=> {
				self.all.set(chat.id, {
					...chat,
					messages: {}
				});
			});
		}
	}
};


export default types.model('Chats', Chats).actions(actions);
