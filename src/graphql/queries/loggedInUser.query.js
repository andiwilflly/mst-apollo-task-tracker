import gql from 'graphql-tag';


export default gql`query loggedInUser {
    loggedInUser {
        id
    }
}`
