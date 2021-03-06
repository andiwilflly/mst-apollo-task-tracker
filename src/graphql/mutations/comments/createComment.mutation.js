import gql from 'graphql-tag';


export default gql`mutation createComment($text: String!, $authorId: ID!, $taskId: ID!) {
    createComment(text: $text, authorId: $authorId, taskId: $taskId)
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
