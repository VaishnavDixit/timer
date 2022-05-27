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
		$(this).attr("disabled", "disabled");
		let mm = $("#ipmin").val();
		let hh = $("#iphr").val();

		hh = (hh == "") ? 0 : hh;
		mm = (mm == "") ? 0 : mm;
		if (hh == 0 && mm == 0) {
			popup.showMessage("*time is not set yet");
			popup.resetInput();
		}
		else if (hh > 6 || hh < 0 || mm < 0 || mm > 360) {
			popup.showMessage("*use arrows to enter a valid input :)");
			popup.resetInput();
		}
		else {
			popup.resetInput();
			popup.resetHead2();
			popup.timerRunningMode();
			$("#timedisplay").html(`hh:${hh} mm:${mm}`);
			chrome.runtime.sendMessage({
				status: "start",
				hh: hh,
				mm: mm,
			});
		}
	})
	$("#stopbtn").click(() => {
		$(this).attr("disabled", "disabled");
		popup.stopTimer();
	})
})

chrome.runtime.onMessage.addListener((message) => {
	if (message.isCompleted === true) {
		popup.timeInputMode();
	}
	else if (message.isCompleted === false) {
		let total = message.tot;
		console.log(total);
		$("#timedisplay").html(`hh:${Math.floor(total / 60)} mm:${total % 60}`);
	}
	return true;
	//return Promise.resolve("Dummy response to keep the console quiet");
});

let popup = {
	showMessage: function (msg) {
		$("#head2").html(msg);
		$("#head2").css("color", "red");
	},
	stopTimer: function () {
		popup.timeInputMode();
		chrome.runtime.sendMessage({
			status: "stop"
		});
		$("#button").removeAttr("disabled");
	},
	resetHead2: function () {
		$("#head2").html("Enter time:");
		$("#head2").css("color", "");
	},
	resetInput: function () {
		$("#stopbtn").removeAttr("disabled");
		$("#ipmin").val("");
		$("#iphr").val("");
	},
	timerRunningMode: function () {
		$("#head2").css("display", "none");
		$("#timeWindow").css("display", "none");
		$("#button").css("display", "none");
		$("#timedisplay").css("display", "block");
		$("#stopbtn").css("display", "block");
	},
	timeInputMode: function () {
		$("#head2").css("display", "block");
		$("#timeWindow").css("display", "block");
		$("#button").css("display", "block");
		$("#timedisplay").css("display", "none");
		$("#stopbtn").css("display", "none");
	},
}
