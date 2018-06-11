import gql from 'graphql-tag';


export default gql`query allChats($boardId: String!) {
    allChats(filter: {
        boardId: $boardId
    }){
        id
        name
        boardId
        messages {
            id
        }
    }
}`
