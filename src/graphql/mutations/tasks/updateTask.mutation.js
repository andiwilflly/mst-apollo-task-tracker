import gql from 'graphql-tag';


export default gql`mutation updateTask($id: ID!, $title: String, $description: String, $boardId: ID, $authorId: ID, $listId: ID, $labelsIds: [ID!], $changedAt: String) {
    updateTask(id: $id, title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId labelsIds: $labelsIds changedAt: $changedAt)
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
