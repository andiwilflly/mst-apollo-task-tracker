import gql from 'graphql-tag';


export default gql`query taskAllInfo($id: ID!) {
    Task(id: $id) {
        id
        title
        description
        createdAt
        author {
            id
        }
        board { 
            id
        }
        list {
            id
        }
        labels {
            id
        }
    }
}`
