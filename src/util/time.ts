export function getTime() {
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = ("0" + date_ob.getHours()).slice(-2);
	let minutes = ("0" + date_ob.getMinutes()).slice(-2);
	let seconds = ("0" + date_ob.getSeconds()).slice(-2);

	let ymd = `${year}-${month}-${date}`;
	let datetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

	return [ymd, datetime];
}

export function getTimestampToDate(timestamp) {
	let date_ob = new Date(timestamp);
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = ("0" + date_ob.getHours()).slice(-2);
	let minutes = ("0" + date_ob.getMinutes()).slice(-2);
	let seconds = ("0" + date_ob.getSeconds()).slice(-2);

	let ymd = `${year}-${month}-${date}`;
	let datetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

	return [ymd, datetime];
}

export const dateToYMD = (newDate) => {
	let date = ("0" + newDate.getDate()).slice(-2);
	let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
	let year = newDate.getFullYear();

	let ymd= `${year}-${month}-${date}`;

	return ymd;
}

export function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
