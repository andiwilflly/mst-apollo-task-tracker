import gql from 'graphql-tag';


export default gql`query getUserInfo($id: ID!) {
    User(id: $id) {
        id
        email
        avatar
        name
        phone
        
        tasks {
            id
        }
        myBoards {
            id
        }
        boards {
            id
        }
        invites {
            id
            boardId
            emailInviteReceiver
            authorId
            user {
                id
            }
        }
    }
}`
