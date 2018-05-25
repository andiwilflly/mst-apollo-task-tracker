import gql from 'graphql-tag';


export default gql`mutation acceptInvite($userId: ID!, $inviteId: ID!, $boardsIds: [ID!]!) {
    acceptInvite(userId: $userId inviteId: $inviteId boardsIds: $boardsIds)
    {
        response
    }
}`
