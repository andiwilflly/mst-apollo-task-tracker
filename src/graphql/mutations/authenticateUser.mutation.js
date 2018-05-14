import gql from 'graphql-tag';


export default gql`mutation authenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
        id
        token
    }
}`
