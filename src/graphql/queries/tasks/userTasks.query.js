import gql from 'graphql-tag';


export default gql`query allTasks($userId: ID!) {
    allTasks(filter: {
        author: {
            id: $userId
        }
    }){
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
        comments {
            id
        }
        labels {
            id
        }
    }
}`
