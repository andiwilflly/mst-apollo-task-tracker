import gql from 'graphql-tag';


export default gql`mutation signupUser($email: String!, $password: String!, $avatar: String, $name: String, $phone: String) {
    signupUser(email: $email, password: $password, avatar: $avatar, name: $name, phone: $phone) {
        id
        token
    }
}`
