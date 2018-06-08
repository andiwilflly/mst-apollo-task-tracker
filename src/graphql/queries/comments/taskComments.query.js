import gql from 'graphql-tag';


export default gql`query allComments($taskId: ID!) {
    allComments(filter: {
        task: {
            id: $taskId
        }
    }){
        id
        text
        createdAt
        task {
            id
        }
        author {
            id
        }
    }
}`
