import { fromEvent } from 'graphcool-lib';
// Queries
import getUser from "../queries/getUser.query";
// Mutations
import createInvite from "../mutations/createInvite.mutation";
import updateUser from "../mutations/updateUser.mutation";


function isValidEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    // Validate email
    if(!isValidEmail(event.data.emailInviteReceiver)) return { error: `Invite error: ${event.data.emailInviteReceiver} is not a valid email address` };
    // Is [invite author] and [invite receiver] are same
    const InviteAuthor = await getUser(api, { userId: event.data.authorId });
    if(InviteAuthor.User && InviteAuthor.User.email === event.data.emailInviteReceiver) return { error: `You can't give an invite for yourself` };

    const duplicatedInvites = await findDuplicatedInvites(api, { boardId: event.data.boardId, emailInviteReceiver: event.data.emailInviteReceiver });

    // Validate duplicated invites
    if(duplicatedInvites.allInvites.length) return { error: `Invite error: Invite to board ${event.data.boardId} for ${event.data.emailInviteReceiver} already exists` };

    const User = await findUserByEmail(api, { email: event.data.emailInviteReceiver });

    // Validate user
    if(!User.User) return { error: "Invite error: User with this email doesn't exist!" };

	await createInvite(api, {
		authorId: event.data.authorId,
		userId: User.User.id, // userInviteReceiver
		boardId: event.data.boardId,
		emailInviteReceiver: event.data.emailInviteReceiver
	});

	await updateUser(api, {id: User.User.id }); // trigger socket

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