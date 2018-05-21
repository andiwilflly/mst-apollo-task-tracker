import gql from 'graphql-tag';


export default gql`mutation createTaskCustom($title: String!, $description: String!, $boardId: ID!, $authorId: ID!, $listId: ID!) {
    createTaskCustom(title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId)
    {
        task
        user
        board
        list
    }
}`
