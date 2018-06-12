import { types } from 'mobx-state-tree';
// MobX
import { runInAction } from "mobx";
// GraphQL
import client from "graphql/client";
import CREATE_CHAT_MESSAGE_MUTATION from "graphql/mutations/chats/createChatMsg.mutation";


const Chat = {
    id: types.identifier(types.string),
    name: types.maybe(types.string),
	boardId: types.maybe(types.string),
	messages: types.array(types.frozen)
};

const actions = (self)=> {
    return {

        update(chat) {
			runInAction(`CHAT-UPDATE-SUCCESS ${chat.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(chat[fieldName] !== undefined) self[fieldName] = chat[fieldName];
				});
			});
        },


        createMessageMutation({ chatId, text }) {
			return client.mutate({
				variables: { chatId, text },
				mutation: CREATE_CHAT_MESSAGE_MUTATION
			}).catch((e)=> console.log("CREATE_CHAT_MESSAGE_MUTATION " + e));
		}
    };
};


const views = (self)=> {
	return {
		get messagesIds() { return self.messages.map((message)=> message.id); }
	};
};

export default types.model('Chat', Chat).actions(actions).views(views);