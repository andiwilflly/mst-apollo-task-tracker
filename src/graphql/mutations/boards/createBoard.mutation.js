import gql from 'graphql-tag';


export default gql`mutation createBoard($name: String!, $description: String!, $authorId: ID!) {
    createBoard(name: $name description: $description authorId:$authorId)
    {
		id
		name
		description
    }
}`
