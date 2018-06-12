import gql from 'graphql-tag';
import UserAllInfoFragment from "graphql/fragments/users/UserAllInfo.fragment";


export default gql`query getUserInfo($id: ID!) {
    User(id: $id) {
        ...UserAllInfo
    }
}
${UserAllInfoFragment}`
