import gql from 'graphql-tag';


export default gql`mutation createInvite($userId: ID!, $boardId: String!, $fromUser: String!) {
    createInvite(userId: $userId, boardId: $boardId, fromUser: $fromUser)
    {
        id
        fromUser
        boardId
        user { id }
    }
}`
