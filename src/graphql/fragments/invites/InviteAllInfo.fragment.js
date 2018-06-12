import gql from 'graphql-tag';


export default gql`fragment InviteAllInfo on Invite {
    id
    boardId
    emailInviteReceiver
    authorId
    user {
        id
    }
}`