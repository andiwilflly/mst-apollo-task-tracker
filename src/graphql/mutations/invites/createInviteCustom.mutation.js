import gql from 'graphql-tag';


export default gql`mutation createInviteCustom($emailForInvite: String!, $boardId: String!) {
    createInviteCustom(emailForInvite: $emailForInvite, boardId: $boardId)
    {
        emailForInvite
        boardId
    }
}`