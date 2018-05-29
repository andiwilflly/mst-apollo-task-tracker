import gql from 'graphql-tag';


export default gql`query updateListRelations($boardId: ID!) {
    updateListRelations(boardId: $boardId) {
        response
    }
}`
