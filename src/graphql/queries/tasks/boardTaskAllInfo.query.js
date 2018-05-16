import gql from 'graphql-tag';


export default gql`query boardTaskAllInfo($id: ID!) {
    Task(id: $id) {
        id
        title
        description
        board { 
            id
        }
    }
}`
