import gql from 'graphql-tag';

export default gql`mutation deleteTaskCustom($taskId: ID!, $userId: ID!, $boardId: ID!, $listId: ID!) {
    deleteTaskCustom(taskId: $taskId, userId: $userId, boardId: $boardId, listId: $listId) {
        user
        board
        list
    }
}`
