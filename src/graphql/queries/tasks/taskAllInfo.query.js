import gql from 'graphql-tag';
import TaskAllInfoFragment from "graphql/fragments/tasks/TaskAllInfo.fragment";


export default gql`query taskAllInfo($id: ID!) {
    Task(id: $id) {
        ...TaskAllInfo
    }
}
${TaskAllInfoFragment}`
