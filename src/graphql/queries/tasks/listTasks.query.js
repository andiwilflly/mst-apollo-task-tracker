import gql from 'graphql-tag';
import TaskAllInfoFragment from "graphql/fragments/tasks/TaskAllInfo.fragment";


export default gql`query allTasks($listId: ID!) {
    allTasks(filter: {
        list: {
            id: $listId
        }
    }){
       ...TaskAllInfo
    }
}
${TaskAllInfoFragment}`
