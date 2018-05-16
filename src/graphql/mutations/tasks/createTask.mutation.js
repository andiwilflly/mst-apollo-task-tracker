import gql from 'graphql-tag';


export default gql`mutation createTask($title: String!, $description: String!, $boardId: ID!) {
    createTask(title: $title description: $description boardId: $boardId)
    {
        id
        title
        description
    }
}`
