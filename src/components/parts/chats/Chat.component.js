import React from 'react';
import Textarea from "react-textarea-autosize";
import { DragDropContainer } from 'react-drag-drop-container';
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
import ChatMessages from "components/parts/chats/ChatMessages.component";


@observer
class Chat extends React.Component {

	@observable isLoading = false;

	@observable isShowChat = false;

	@observable form = {
		text: ""
	};


	@computed get board() { return store.boards.all.get(this.props.boardId) };

	@computed get chat() { return values(store.chats.all).find((chat)=> chat.boardId === this.props.boardId); };


	onChangeMessage = (e)=> {
		this.form.text = e.currentTarget.value;
	};


	onKeyPress = (e)=> {
		if(e.key === 'Enter') this.sendMessage();
	};


	sendMessage = async ()=> {
		await this.chat.createMessageMutation({
			chatId: this.chat.id,
			authorId: store.authorizedUser.id,
			text: this.form.text
		});
		this.form.text = "";
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
		console.log(this.chat, "this.chat");
		return (
			<DragDropContainer targetKey="chat" dragHandleClassName="chat_title" dragData={{ chatId: this.chat.id }}>
				<div className="chat" style={{ left: this.chat.x, bottom: this.chat.y }}>
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

					<ChatMessages chatId={ this.chat.id } />

					<div className="chat_message_create cf">
						<Textarea value={ this.form.text }
								  onKeyPress={ this.onKeyPress }
								  className="chat_message_input"
								  useCacheForDOMMeasurements
								  onChange={ this.onChangeMessage } />
						<button className="chat_message_send_btn" onClick={ this.sendMessage }>Send</button>
					</div>
				</div>
			</DragDropContainer>
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
