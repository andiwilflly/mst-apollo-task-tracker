import gql from 'graphql-tag';


export default gql`mutation createList($name: String!, $boardId: ID!) {
    createList(name: $name  boardId:$boardId)
    {
        id
        name
    }
}`
