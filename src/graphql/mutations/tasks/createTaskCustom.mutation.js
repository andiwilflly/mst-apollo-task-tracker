import gql from 'graphql-tag';


export default gql`mutation createTaskCustom($title: String!, $description: String!, $boardId: ID!, $authorId: ID!, $listId: ID!, $labelsIds: [ID!]! ) {
    createTaskCustom(title: $title description: $description boardId: $boardId authorId: $authorId listId: $listId labelsIds: $labelsIds)
    {
        task
        user
        board
        list
        labels
    }
}`
