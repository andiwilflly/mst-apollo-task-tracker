async function deleteComment(api, { commentId }) {
    const mutation = `
        mutation deleteComment($id: ID!) {
            deleteComment(id: $id) {
                id
            }
        }
  `;

    const variables = {
        id: commentId,
    };

    return api.request(mutation, variables);
}


export default deleteComment;