import gql from 'graphql-tag';


export default gql`mutation updateTask($id: ID!, $title: String, $description: String, $boardId: ID, $authorId: ID, $listId: ID) {
    updateTask(id: $id, title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId)
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
