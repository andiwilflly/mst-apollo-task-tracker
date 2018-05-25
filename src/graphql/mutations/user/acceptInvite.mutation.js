import gql from 'graphql-tag';


export default gql`mutation acceptInvite($userId: ID!, $inviteId: ID!, $inviteBoardId: String!, $boardsIds: [ID!]!) {
    acceptInvite(userId: $userId inviteId: $inviteId inviteBoardId: $inviteBoardId boardsIds: $boardsIds)
    {
        response
    }
}`
