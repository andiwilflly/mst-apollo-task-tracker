import gql from 'graphql-tag';


export default gql`mutation updateTaskCustom($id: ID!, $title: String, $description: String, $boardId: ID, $authorId: ID, $listId: ID) {
    updateTaskCustom(id: $id title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId)
    {
        response
    }
}`
