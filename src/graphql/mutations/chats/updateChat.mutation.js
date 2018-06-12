import gql from 'graphql-tag';


export default gql`mutation updateChat($name: String, $x: Int, $y: Int) {
    updateChat(name: $name, x: $x, y: $y)
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
