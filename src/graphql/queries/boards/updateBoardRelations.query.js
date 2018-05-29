import gql from 'graphql-tag';


export default gql`query updateBoardRelations($authorId: ID!) {
    updateBoardRelations(authorId: $authorId) {
        response
    }
}`
