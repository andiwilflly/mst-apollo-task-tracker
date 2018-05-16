import gql from 'graphql-tag';


export default gql`mutation deleteTask($taskId: ID!) {
    deleteTask(id: $taskId) {
        id
    }
}`
