import gql from 'graphql-tag';
import InviteAllInfoFragment from "graphql/fragments/invites/InviteAllInfo.fragment";


export default gql`fragment UserAllInfo on User {
    id
    email
    avatar
    name
    phone
    lastVisit
    tasks {
        id
    }
    myBoards {
        id
    }
    boards {
        id
    }
	comments {
		id
	}
    invites {
        ...InviteAllInfo
    }
}
${InviteAllInfoFragment}`