import gql from 'graphql-tag';


export default gql`mutation updateTaskCustomRelations($id: ID!, $title: String, $description: String, $boardId: ID, $authorId: ID, $listId: ID, $labelsIds: [ID!]) {
    updateTaskCustomRelations(id: $id title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId labelsIds: $labelsIds)
    {
        response
    }
}`
