$(document).ready(() => {
	console.log("Page opened.");
	chrome.storage.sync.get(['status'], function (result) {
		if (result.status === "running") {
			console.log("Timer is running!");
			popup.updateValues();
			popup.timerRunningDisplay();
		} else {
			console.log("Timer is not running!");
			popup.timeInputMode();
		}
	});
	$("#button").click(() => {
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
			chrome.runtime.sendMessage({
				status: "Start",
				hh: hh,
				mm: mm
			});
			popup.updateValues();
			popup.timerRunningDisplay();
		}
	});
	$("#stopbtn").click(() => {
		chrome.runtime.sendMessage({
			status: "stop"
		});
		popup.stopTimer();
	})
});
chrome.runtime.onMessage.addListener((message) => {
	if (message.isCompleted === true) {
		popup.timeInputMode();
	}
	else if (message.isCompleted === false) {
		popup.updateValues();
	}
	return true;
});
let popup = {
	showMessage: function (msg) {
		$("#head2").html(msg);
		$("#head2").css("color", "red");
	},
	stopTimer: function () {
		popup.timeInputMode();
		//$("#button").removeAttr("disabled");
	},
	resetHead2: function () {
		$("#head2").html("Enter time:");
		$("#head2").css("color", "");
	},
	resetInput: function () {
		//$("#stopbtn").removeAttr("disabled");
		$("#ipmin").val("");
		$("#iphr").val("");
	},
	startTimer: function (hh, mm) {
		chrome.storage.sync.set({ status: "running", hh: hh, mm: mm });
		popup.timerRunningMode();
		chrome.runtime.sendMessage({
			status: "start",
			hh: hh,
			mm: mm
		});
		popup.resetInput();
		popup.resetHead2();
	},
	timerRunningDisplay: function () {
		$("#head2").css("display", "none");
		$("#timeWindow").css("display", "none");
		$("#button").css("display", "none");
		$("#progressBar").css("display", "block");
		$("#timedisplay").css("display", "block");
		$("#stopbtn").css("display", "block");
	},
	updateValues: function(){
		chrome.storage.sync.get(['hh', 'mm', 'initialHH', 'initialMM'], function (result) {
			let newHH = result.hh, newMM = result.mm;
			let tot = (Number(result.initialHH) * 60) + Number(result.initialMM);
			let precentage = ((Number((newHH) * 60) + Number(newMM)) / Number(tot)) * 100;
			console.log(precentage);
			$("#l").css("width", 100-precentage + '%');
			$("#r").css("width", precentage + '%');
			$("#timedisplay").html(`hh:${newHH} mm:${newMM}`);
			console.log(`hh:${newHH}, mm:${newMM}`);
		});
	},
	timeInputMode: function () {
		$("#head2").css("display", "block");
		$("#timeWindow").css("display", "block");
		$("#button").css("display", "block");
		$("#progressBar").css("display", "none");
		$("#timedisplay").css("display", "none");
		$("#stopbtn").css("display", "none");
	}
}