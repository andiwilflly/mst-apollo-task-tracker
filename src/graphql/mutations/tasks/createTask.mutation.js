import gql from 'graphql-tag';


export default gql`mutation createTask($title: String!, $description: String!, $boardId: ID!, $authorId: ID!, $listId: ID!, $labelsIds: [ID!]! ) {
    createTask(title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId labelsIds: $labelsIds)
    {
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
