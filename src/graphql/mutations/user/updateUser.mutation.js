import gql from 'graphql-tag';


export default gql`mutation ($id:ID!, $email: String, $avatar: String) {
    updateUser(id: $id, email: $email, avatar: $avatar) {
        id
        email
        avatar
    }
}`
