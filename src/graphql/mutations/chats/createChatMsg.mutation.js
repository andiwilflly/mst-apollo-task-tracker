import gql from 'graphql-tag';


export default gql`mutation createChatMsg($chatId: ID!, $text: String!) {
    createChatMsg(chatId: $chatId, text: $text)
    {
        id
        text
        chat {
            id
        }
    }
}`
