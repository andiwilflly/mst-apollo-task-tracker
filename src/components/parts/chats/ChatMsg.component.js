import React from 'react';
// Styles
import "styles/chats/chat-msg.css";
// MobX
import { observer } from "mobx-react";


@observer
class ChatMsg extends React.Component {


	render() {
		return (
			<div className="chat_msg">
				ChatMsg { this.props.messageId }
			</div>
		);
	}
}


export default ChatMsg;
