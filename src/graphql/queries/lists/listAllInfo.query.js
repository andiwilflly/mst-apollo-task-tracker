import gql from 'graphql-tag';


export default gql`query listAllInfo($id: ID!) {
    List(id: $id) {
        id
        name
        tasks {
            id
        }
        board {
            id
        }
    }
}`
