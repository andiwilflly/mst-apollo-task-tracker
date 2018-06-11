import gql from 'graphql-tag';


export default gql`query chatAllInfo($id: ID!) {
    Chat(id: $id) {
        id
        name
        boardId
        messages {
            id
        }
    }
}`
