import gql from 'graphql-tag';


export default gql`mutation createLabel($color: String!) {
    createLabel(color: $color) {
        id
        color
        tasks { id }
    }
}`
