import gql from 'graphql-tag';


export default gql`query updateListRelations($id: ID!, $boardId: ID!) {
    updateListRelations(id: $id, boardId: $boardId) {
        response
    }
}`
