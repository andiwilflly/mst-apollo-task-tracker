import gql from 'graphql-tag';


export default gql`fragment TaskAllInfo on Task {
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
}`