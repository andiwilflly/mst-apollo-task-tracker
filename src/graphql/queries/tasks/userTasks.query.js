import gql from 'graphql-tag';
import TaskAllInfoFragment from "graphql/fragments/tasks/TaskAllInfo.fragment";


export default gql`query allTasks($userId: ID!) {
    allTasks(filter: {
        author: {
            id: $userId
        }
    }){
        ...TaskAllInfo
    }
}
${TaskAllInfoFragment}`
