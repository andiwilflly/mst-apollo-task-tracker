import gql from 'graphql-tag';


export default gql`query commentAllInfo($id: ID!) {
    Comment(id: $id) {
        id
        text
        task {
            id
        }
        author {
            id
        }
    }
}`
