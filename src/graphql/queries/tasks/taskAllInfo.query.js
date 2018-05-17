import gql from 'graphql-tag';


export default gql`query taskAllInfo($id: ID!) {
    Task(id: $id) {
        id
        title
        description
        board { 
            id
        }
    }
}`
