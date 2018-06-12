import React from 'react';
// Styles
import "styles/comments/comment.css";
// MobX
import { computed, values, reaction } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import CHAT_MESSAGES_QUERY from "graphql/queries/chats/chatMessages.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import ChatMsg from "components/parts/chats/ChatMsg.component";


@observer
class ChatMessages extends React.Component {

	@computed get chat() { return store.chats.all.get(this.props.chatId) };

	@computed get chatMessages() { return values(this.chat.messages); };

	@computed get sortedMessages() { return this.chatMessages.sort((a, b)=> a > b); };


	componentDidMount() {
		this["@reaction on add or remove chat message"] = reaction(
			()=> this.chatMessages.length,
			()=> {
				setTimeout(()=> this.refs.chatMessages.scrollTop = this.refs.chatMessages.scrollHeight - this.refs.chatMessages.clientHeight, 0);
			},
			{
				name: "@reaction on add or remove chat message",
				fireImmediately: true
			}
		);
	}


	componentWillUnmount() {
		this["@reaction on add or remove chat message"]();
	}


	render() {
		return (
			<div className="chat_messages" ref="chatMessages">
				<QueryLoader query={ CHAT_MESSAGES_QUERY }
							 variables={{ chatId: this.props.chatId }}>
					{ this.chatMessages.length ?
						this.sortedMessages.map((message)=> <ChatMsg key={message.id} chatId={ this.props.chatId } messageId={ message.id } />)
						: null }
				</QueryLoader>
			</div>
		)
	}
}


export default ChatMessages;
