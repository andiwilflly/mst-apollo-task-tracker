import React from 'react';
// Styles
import "styles/chats/chat.css";
// MobX
import { computed, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import CHAT_ALL_INFO_QUERY from "graphql/queries/chats/chatAllInfo.query";
import BOARD_CHAT_ALL_INFO_QUERY from "graphql/queries/chats/boardChatAllInfo.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";


@observer
class Chat extends React.Component {


	@computed get board() { return store.boards.all.get(this.props.boardId) };

	@computed get chat() {
		return this.props.chatId ?
			store.chats.all.get(this.props.chatId)
			:
			values(store.chats.all).find((chat)=> chat.boardId === this.props.boardId);
	};


	createChat() {
		console.log("CC.>>>>>", this.board.name, this.props.boardId);
		store.chats.createMutation({
			name: this.board.name,
			boardId: this.props.boardId
		});
		return <div className="chat"><PreLoader /></div>;
	}


	renderChat() {
		return (
			<div className="chat">
				CHAT!
			</div>
		);
	}


	render() {
		// W.O. Query...
		if(this.chat) return this.renderChat();

		if(this.props.boardId) return (
			<QueryLoader query={ BOARD_CHAT_ALL_INFO_QUERY }
						 preLoader={<div className="chat"><PreLoader/></div>}
						 variables={{ boardId: this.props.boardId }}>
				{ this.chat ?
					this.renderChat()
					:
					this.createChat()
				}
			</QueryLoader>
		);

		return (
			<QueryLoader query={ CHAT_ALL_INFO_QUERY }
						 preLoader={<div className="chat"><PreLoader/></div>}
						 variables={{ id: this.props.chatId }}>
				{ this.chat ?
					this.renderChat()
					:
					this.createChat()
				}
			</QueryLoader>
		)
	}
}


export default Chat;
