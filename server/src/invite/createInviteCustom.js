import { fromEvent } from 'graphcool-lib';
// Queries
import createInvite from "../mutations/createInvite.mutation";

export default async (event)=> {

    console.log("-===> ", event.data);

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    const User = await findUserByEmail(api, { email: event.data.emailInviteReceiver });
console.log('%%---> User', User)

    if(!User) {
        return { error: "User with this email doesn't exist!" }
    }

    response.push(await createInvite(api, {
        userId: User.id, // userInviteReceiver
        boardId: event.data.boardId,
        emailInviteReceiver: event.data.emailInviteReceiver
    }));

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}

async function findUserByEmail(api, { email }) {

    const query = `
        query findUserByEmail($email: String!) {
            allUsers(filter: {
                email: $email
            }) {
                id
            }
        }
    `;
    const variables = {
        email
    };

    return api.request(query, variables);
}