import gql from 'graphql-tag';


export default gql`query labelAllInfo($id: ID!) {
    Label(id: $id) {
        id
        color
        tasks {
            id
        }
    }
}`
