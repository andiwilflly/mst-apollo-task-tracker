import React from 'react';
// Utils
import lazy from "utils/lazy.utils";


@lazy(()=> import(/* webpackChunkName: "Chat" */ 'components/parts/chats/Chat.component'))
class Chat extends React.Component {
}


export default Chat;
