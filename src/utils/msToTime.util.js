export default function msToTime(duration) {
	// var milliseconds = parseInt((duration % 1000) / 100),
	let seconds = parseInt((duration / 1000) % 60, 1);
	let minutes = parseInt((duration / (1000 * 60)) % 60, 1);
	let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 1);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
}