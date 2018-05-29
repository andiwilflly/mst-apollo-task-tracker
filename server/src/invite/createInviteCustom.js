import { fromEvent } from 'graphcool-lib';
// Queries
import createInvite from "../mutations/createInvite.mutation";


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    const duplicatedInvites = await findDuplicatedInvites(api, { boardId: event.data.boardId, emailInviteReceiver: event.data.emailInviteReceiver });

    if(duplicatedInvites.allInvites.length) {
		return { error: `Invite to board ${event.data.boardId} for ${event.data.emailInviteReceiver} already exists` };
    }

    const User = await findUserByEmail(api, { email: event.data.emailInviteReceiver });

    if(!User.User) {
        return { error: "User with this email doesn't exist!" };
    }

    response.push(await createInvite(api, {
        authorId: event.data.authorId,
        userId: User.User.id, // userInviteReceiver
        boardId: event.data.boardId,
        emailInviteReceiver: event.data.emailInviteReceiver
    }));

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}


async function findDuplicatedInvites(api, { boardId, emailInviteReceiver }) {

    const query = `
        {
             allInvites(filter: {
                 boardId: "${boardId}" 
                 emailInviteReceiver: "${emailInviteReceiver}"
             }) {
                 id
             }
        }
    `;

	const variables = {

	};

	return api.request(query, variables);
}


async function findUserByEmail(api, { email }) {

    const query = `
        query getUserInfo($email: String!) {
             User(email: $email) {
                id
                email
                
                tasks {
                    id
                }
                myBoards {
                    id
                }
                boards {
                    id
                }
                invites {
                    id
                    authorId
                    boardId
                    emailInviteReceiver
                    user {
                        id
                    }
                }
             }
        }
    `;
    const variables = {
		email: email
    };

    return api.request(query, variables);
}