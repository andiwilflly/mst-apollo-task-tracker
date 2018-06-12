import gql from 'graphql-tag';


export default gql`query allChats($boardId: String!) {
    allChats(filter: {
        boardId: $boardId
    }){
        id
        name
        boardId
        x
        y
        messages {
            id
        }
    }
}`
