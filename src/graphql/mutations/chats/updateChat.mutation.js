import gql from 'graphql-tag';


export default gql`mutation updateChat($id: ID!, $name: String, $x: Int, $y: Int) {
    updateChat(id: $id, name: $name, x: $x, y: $y)
    {
        id
        name
        boardId
        x
        y
        messages {
            id
        }
    }
}`
