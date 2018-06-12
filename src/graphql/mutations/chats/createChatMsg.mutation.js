import gql from 'graphql-tag';


export default gql`mutation createChatMsg($chatId: ID!, $authorId: String!, $text: String!) {
    createChatMsg(chatId: $chatId, authorId: $authorId, text: $text)
    {
        id
        text
        createdAt
        authorId
        chat {
            id
        }
    }
}`
