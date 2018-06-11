import gql from 'graphql-tag';


export default gql`mutation createChat($name: String!, $boardId: String!) {
    createChat(name: $name, boardId: $boardId)
    {
        id
        name
        boardId
        messages {
            id
        }
    }
}`
