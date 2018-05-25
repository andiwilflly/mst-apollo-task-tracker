import gql from 'graphql-tag';


export default gql`query getUserInfo($id: ID!) {
    User(id: $id) {
        id
        email
        
        tasks {
            id
        }
        myBoards {
            id
        }
        boards {
            id
        }
    }
}`
