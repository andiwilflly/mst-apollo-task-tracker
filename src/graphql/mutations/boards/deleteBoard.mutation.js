import gql from 'graphql-tag';


export default gql`mutation deleteBoard($boardId: ID!) {
    deleteBoard(id: $boardId) {
        id
    }
}`
