import { fromEvent } from 'graphcool-lib';
// Queries
import getAuthUser from "../queries/getAuthUser.query";


export default async (event)=> {

	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');


	const user = await getAuthUser(api);

	console.log("------> !!", user);

	// event.data.title = "OTKUDA ETOT TITLE??";

	return event
}