import gql from 'graphql-tag';


export default gql`query getUserInfo User($id: String!) {
    id
    email
}`
