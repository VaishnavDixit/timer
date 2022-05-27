// var startButton = document.getElementById("button");
// var timetext = document.getElementById("timedisplay");
// var timeD = document.getElementById("timediv");
// var stopBtn = document.getElementById("stopbtn");
// var text = document.getElementById("head2");
// var timeWindow = document.getElementById("timeWindow");

// startButton.addEventListener("click", function () {
// 	chrome.runtime.sendMessage({data: "Start the timer"}, function(response) {
// 		console.log(response.farewell);
// 	});
// });

$(document).ready(() => {
	$("#button").click(() => {

		let mm = $("#ipmin").val();
		let hh = $("#iphr").val();
		if (hh >= 6) {
			$("#head2").html("use arrows to input time :)");
			$("#head2").css("color", "red");
		} else {
			resetHead2();
			$("#timedisplay").html(`hh:${hh} mm:${mm}`);
			chrome.runtime.sendMessage({
				status: "start",
				hh: hh,
				mm: mm
			});
		}
	})
	$("#stopbtn").click(() => {
		resetHead2();
		chrome.runtime.sendMessage({
			status: "stop"
		});
	})
})
chrome.runtime.onMessage.addListener((message) => {
	if (message.isCompleted === true) {
		alert("completed");
		$("#timedisplay").html("-adfg--");
	}
	else if (message.isCompleted === false) {
		let total = message.tot;
		console.log(total);
		$("#timedisplay").html(`hh:${Math.floor(total / 60)} mm:${total % 60}`);
	}
	return true;
	//return Promise.resolve("Dummy response to keep the console quiet");
});

function resetHead2() {
	$("#head2").html("Enter time:");
	$("#head2").css("color", "");
}