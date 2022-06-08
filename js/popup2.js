$(document).ready(() => {
	console.log("Page opened.");
	$("#button").click(() => {

		if (hh === 0 && mm === 0) {
			popup.showMessage("*time is not set yet");
			popup.resetInput();
		}
		else if (hh > 60 || hh < 0 || mm < 0 || mm > 360) {//time  todo
			popup.showMessage("*use arrows to enter a valid input!");
			popup.resetInput();
		}
		else {
			var date = new Date();
			var time = date.getTime();
			let mm = $("#ipmin").val();
			let hh = $("#iphr").val();
			hh = (hh === "") ? 0 : hh;
			mm = (mm === "") ? 0 : mm;

			let milli = ((hh * 3600) + (mm * 60)) * 1000;
		}
	});
	$("#stopbtn").click(() => {
		chrome.runtime.sendMessage({
			status: "stop"
		});
		popup.stopTimer();
	})
});