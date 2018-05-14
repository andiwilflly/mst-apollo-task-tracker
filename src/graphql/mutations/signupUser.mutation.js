import gql from 'graphql-tag';


export default gql`mutation signupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
        id
        token
    }
}`
