import gql from 'graphql-tag';


export default gql`query updateTaskRelations($boardId: ID!, $listId: ID!, $authorId: ID!) {
    updateTaskRelations(boardId: $boardId, listId: $listId, authorId: $authorId) {
       response
    }
}`
