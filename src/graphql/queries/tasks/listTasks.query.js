import gql from 'graphql-tag';


export default gql`query allTasks($listId: ID!) {
    allTasks(filter: {
        list: {
            id: $listId
        }
    }){
        id
        title
        description
        createdAt
        author {
            id
        }
        board {
            id
        }
        list {
            id
        }
        comments {
            id
        }
        labels {
            id
        }
    }
}`
