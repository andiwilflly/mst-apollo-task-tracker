import gql from 'graphql-tag';


export default gql`query boardAllInfo($id: ID!) {
    Board(id: $id) {
        id
        name
        description
        tasks {
            id
        }
    }
}`
