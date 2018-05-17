import gql from 'graphql-tag';


export default gql`mutation ($id:ID!, $email: String!) {
    updateUser(id: $id, email: $email) {
        id
        email
    }
}`
