import gql from 'graphql-tag';


export default gql`query getUserInfo($id: ID!) {
    User(id: $id) {
        id
        email
        avatar
        name
        phone
        lastVisit

        tasks {
            id
        }
        myBoards {
            id
        }
        boards {
            id
        }
        comments {
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
