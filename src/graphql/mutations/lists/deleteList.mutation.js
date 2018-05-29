import gql from 'graphql-tag';


export default gql`mutation deleteList($listId: ID!) {
    deleteList(id: $listId) {
        id
    }
}`
