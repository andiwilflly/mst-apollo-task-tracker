import gql from 'graphql-tag';


export default gql`mutation ($id:ID!, $email: String, $avatar: String, $name: String, $phone: String) {
    updateUser(id: $id, email: $email, avatar: $avatar, name: $name, phone: $phone) {
        id
        email
        avatar
        name
        phone
    }
}`
