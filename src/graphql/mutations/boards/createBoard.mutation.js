import gql from 'graphql-tag';


export default gql`mutation createBoard($name: String!, $description: String!, $authorId: ID!, $background: String) {
    createBoard(name: $name description: $description authorId:$authorId background: $background)
    {
        id
        name
        description
        background
        author {
            id
        }
        users {
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
