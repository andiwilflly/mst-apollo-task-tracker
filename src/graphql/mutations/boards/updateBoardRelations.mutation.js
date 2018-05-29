import gql from 'graphql-tag';


export default gql`mutation updateBoardRelations($authorId: ID!) {
    updateBoardRelations(authorId: $authorId) {
        response
    }
}`
