import gql from 'graphql-tag';


export default gql`mutation updateComment($text: String!, $authorId: ID!, $taskId: ID!) {
    updateComment(text: $text, authorId: $authorId, taskId: $taskId)
    {
        id
        text
        createdAt
        author {
            id
        }
        task {
            id
        }
    }
}`
