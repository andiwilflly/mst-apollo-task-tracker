import gql from 'graphql-tag';


export default gql`mutation deleteComment($commentId: ID!) {
    deleteComment(id: $commentId) {
        id
    }
}`
