import gql from 'graphql-tag';


export default gql`mutation createInvite($userId: ID!, $boardId: ID!, $emailForInvite: String!) {
    createInvite(userId :$userId, boardId: $boardId, emailForInvite: $emailForInvite)
    {
        id
        emailForInvite
        boardId
        user { id }
    }
}`
