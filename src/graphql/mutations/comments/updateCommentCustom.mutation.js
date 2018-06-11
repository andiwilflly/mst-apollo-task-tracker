import gql from 'graphql-tag';


export default gql`mutation updateCommentCustom($id: ID!, $text: String, $authorId: ID, $taskId: ID) {
    updateCommentCustom(id: $id text: $text authorId: $authorId taskId: $taskId)
    {
        response
    }
}`
