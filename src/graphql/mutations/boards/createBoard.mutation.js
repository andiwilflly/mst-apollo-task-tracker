import gql from 'graphql-tag';


export default gql`mutation createBoard($name: String!, $description: String!, $authorId: ID!) {
    createBoard(name: $name description: $description authorId:$authorId)
    {
        id
        name
        description
        author {
            id
        }
        lists {
            id
        }
        tasks {
            id
        }
    }
}`
