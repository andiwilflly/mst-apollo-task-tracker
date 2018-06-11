import gql from 'graphql-tag';


export default gql`query chatMsgAllInfo($id: ID!) {
    ChatMsg(id: $id) {
        id
        text
        chat {
            id
        }
    }
}`
