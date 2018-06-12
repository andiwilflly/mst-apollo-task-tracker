import React from 'react';
// Styles
import "styles/chats/chat-msg.css";
// MobX
import { computed } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQl
import CHAT_MESSAGE_ALL_INFO from "graphql/queries/chats/chatMsgAllInfo.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";
import UserIcon from "components/parts/users/UserIcon.component";


@observer
class ChatMsg extends React.Component {


	@computed get chatMsg() { return store.chats.all.get(this.props.chatId).messages.get(this.props.messageId) };


	renderChatMsg() {
		return (
			<div className="chat_msg">
				<UserIcon userId={ this.chatMsg.authorId } width={20} height={20} />
				<div className="chat_msg_date">{ new Date(this.chatMsg.createdTime).toLocaleString() }</div>
				<div className="chat_msg_text">{ this.chatMsg.text }</div>
			</div>
		);
	}


	render() {
		if(this.chatMsg) return this.renderChatMsg();

		return (
			<div className="chat_msg">
				<QueryLoader query={ CHAT_MESSAGE_ALL_INFO }
							 variables={{ id: this.props.messageId }}>
					{ this.chatMsg ?
						this.renderChatMsg()
						:
						<PreLoader />
					}
				</QueryLoader>
			</div>
		);
	}
}


export default ChatMsg;
