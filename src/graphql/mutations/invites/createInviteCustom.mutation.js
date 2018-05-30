import gql from 'graphql-tag';


export default gql`mutation createInviteCustom($emailInviteReceiver: String!, $authorId: String!, $boardId: String!) {
    createInviteCustom(emailInviteReceiver: $emailInviteReceiver, authorId: $authorId, boardId: $boardId)
    {
        response
    }
}`