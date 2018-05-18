import gql from 'graphql-tag';


export default gql`mutation createTask($title: String!, $description: String!, $boardId: ID!, $authorId: ID!, $listId: ID! ) {
    createTask(title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId)
    {
        id
        title
        description
        author {
            id
        }
        list {
            id
        }
        board {
            id
        }
    }
}`
