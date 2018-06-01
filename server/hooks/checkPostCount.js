export default async event => {

	console.log('------> ', event.data);

	return {
		data: event
	}
}