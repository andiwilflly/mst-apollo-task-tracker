import { fromEvent } from 'graphcool-lib';
// Mutations
import updateUser from "../../mutations/updateUser.mutation";
// Queries
import deleteInvite from "../../mutations/deleteInvite.mutation";


export default async (event)=> {

    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const response = [];

    await deleteInvite(api, { inviteId: event.data.inviteId });

    updateUser(api, {
        userId: event.data.userId
    });

    return {
        data: {
            response: JSON.stringify(response)
        }
    }
}
