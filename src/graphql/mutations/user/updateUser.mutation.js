import gql from 'graphql-tag';


export default gql`mutation ($id:ID!, $email: String, $avatar: String, $name: String, $phone: String, $lastVisit: String) {
    updateUser(id: $id, email: $email, avatar: $avatar, name: $name, phone: $phone, lastVisit: $lastVisit) {
        id
        email
        avatar
        name
        phone
        lastVisit
    }
}`
