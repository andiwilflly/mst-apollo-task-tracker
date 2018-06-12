import gql from 'graphql-tag';


export default gql`query allChatMsgs($chatId: ID!) {
    allChatMsgs(filter: {
        chat: {
            id: $chatId
        }
    }){
        id
        text
        createdAt
        authorId
        chat {
            id
        }
    }
}`
