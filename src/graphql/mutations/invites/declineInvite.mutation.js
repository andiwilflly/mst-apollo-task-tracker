import gql from 'graphql-tag';


export default gql`mutation declineInvite($userId: ID!, $inviteId: ID!) {
    declineInvite(userId: $userId inviteId: $inviteId)
    {
        response
    }
}`
