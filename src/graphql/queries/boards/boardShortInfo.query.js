import gql from 'graphql-tag';


export default gql`query boardShortInfo($id: ID!) {
    Board(id: $id) {
        id
        name
        description
        author {
            id
        }
    }
}`
