import React from 'react';
// Styles
import "styles/chats/chat.css";
// MobX
import { computed, observable, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import BOARD_CHAT_ALL_INFO_QUERY from "graphql/queries/chats/boardChatAllInfo.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";
import UserIcon from "components/parts/users/UserIcon.component";
import ChatMsg from "components/parts/chats/ChatMsg.component";


@observer
class Chat extends React.Component {

	@observable isLoading = false;

	@observable isShowChat = false;


	@computed get board() { return store.boards.all.get(this.props.boardId) };

	@computed get chat() {
		return values(store.chats.all).find((chat)=> chat.boardId === this.props.boardId);
	};


	createChat = async ()=> {
		this.isLoading = true;
		await store.chats.createMutation({
			name: this.board.name,
			boardId: this.props.boardId
		});
		this.isLoading = false;
	};


	renderCreateChat() {
		return (
			<button onClick={ this.createChat }
					disabled={ this.isLoading }>{
				this.isLoading ?
					<PreLoader />
					:
					'Create chat'
			}</button>
		);
	}


	renderChat() {
		console.log(this.chat);
		return (
			<div className="chat">
				<div className="chat_title cf">
					<span style={{ float: "left", marginRight: 10 }}>🗣 { this.chat.name }</span>
					<div style={{ float: 'right' }}>
						{ [...this.board.usersIds, this.board.authorId].map((userId)=> {
							return (
								<UserIcon key={userId} userId={ userId } width={20} height={20} />
							)
						}) }
					</div>
				</div>
				<div className="chat_messages">
					{ this.chat.messagesIds.length ?
						this.chat.messagesIds.map((messageId)=> {
							return <ChatMsg messageId={ messageId } />
						})
						:
						<div>No messages..</div>
					}
				</div>
			</div>
		);
	}


	render() {
		if(this.chat) return this.renderChat();
		return (
			<div className="chat">
				<QueryLoader query={ BOARD_CHAT_ALL_INFO_QUERY }
							 variables={{ boardId: this.props.boardId }}>
					{ this.chat ?
						this.renderChat()
						:
						this.renderCreateChat()
					}
				</QueryLoader>
			</div>
		);
	}
}


export default Chat;
