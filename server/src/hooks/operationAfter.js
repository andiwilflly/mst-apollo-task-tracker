import { fromEvent } from 'graphcool-lib';


export default async (event)=> {

	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');


	console.log("afterNodeCreate !!------> !!");


	return event
}