export default async event => {

	console.log('1 ------> ', event.data);

	event.data.title = "OTKUDA ETOT TITLE??";

	return event
}