import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import ChatModel from "models/chats/Chat.model";
// GraphQL
import client from "graphql/client";
import CHAT_CREATE_MUTATION from "graphql/mutations/chats/createChat.mutation";
// import CHAT_DELETE_MUTATION from "graphql/mutations/chats/deleteChat.mutation";


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


		deleteMutation: async ({ chatId })=> {
			// return client.mutate({
			// 	variables: { chatId },
			// 	mutation: CHAT_DELETE_MUTATION
			// }).catch((e)=> console.log("CHAT_DELETE_MUTATION", e));
		},


		create(chat) {
			if(self.all.has(chat.id)) return self.all.get(chat.id).update(chat);

			runInAction(`CHAT-CREATE-SUCCESS ${chat.id}`, ()=> {
				self.all.set(chat.id, chat);
			});
		},


		delete(chatId) {
			runInAction(`CHAT-DELETE-SUCCESS ${chatId}`, ()=> {
				self.all.delete(chatId);
			});
		}
	}
};


export default types.model('Chats', Chats).actions(actions);
