import gql from 'graphql-tag';


export default gql`query updateTaskRelations($id: ID!, $boardId: ID!, $listId: ID!, $authorId: ID!) {
    updateTaskRelations(id: $id, boardId: $boardId, listId: $listId, authorId: $authorId) {
       response
    }
}`
