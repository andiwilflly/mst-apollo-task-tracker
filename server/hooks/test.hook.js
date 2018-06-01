export default async (event)=> {

	console.log("========>> TEST HOOK", event);

	return {
		error: `You can at most have 32 posts`
	}
}
