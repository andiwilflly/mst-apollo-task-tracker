import gql from 'graphql-tag';


export default gql`mutation updateListRelations($boardId: ID!) {
    updateListRelations(boardId: $boardId) {
        response
    }
}`
