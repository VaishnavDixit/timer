$(document).ready(() => {
	console.log("Page opened.");
	chrome.storage.sync.get(['isRunning'], function (result) {
		if (result.isRunning === true) {
			popup.timerRunningDisplay();
			console.log("Timer is running!");
			chrome.storage.sync.get(['hh', 'mm', 'ss'], (res) => {
				popup.updateValues(res.hh, res.mm, res.ss);
			});
		} else {
			console.log("Timer is not running!");
			popup.timeInputMode();
		}
	});
	$("#button").click(() => {
		console.log("clicked start!");
		let mm = $("#ipmin").val();
		let hh = $("#iphr").val();
		hh = (hh === "") ? 0 : hh;
		mm = (mm === "") ? 0 : mm;
		if (hh === 0 && mm === 0) {
			popup.showMessage("*time is not set yet");
			popup.resetInput();
		}
		else if (hh > 60 || hh < 0 || mm < 0 || mm > 360) {//time  todo
			popup.showMessage("*use arrows to enter a valid input!");
			popup.resetInput();
		}
		else {
			popup.resetHead2();
			chrome.storage.sync.set({ 'isRunning': true, hh: hh, mm: mm, initialHH: hh, initialMM: mm });
			chrome.runtime.sendMessage({
				status: "start",
				hh: hh,
				mm: mm
			});
			popup.updateValues(hh, mm, Number(0));
			popup.timerRunningDisplay();
			popup.resetInput();
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
		popup.updateValues(message.hh, message.mm, message.ss);
	}
	return true;
});
let popup = {
	showMessage: function (msg) {
		$("#head2").html(msg);
		$("#head2").css("color", "red");
	},
	stopTimer: function () {
		this.timeInputMode();
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
	timerRunningDisplay: function () {
		$("#head2").css("display", "none");
		$("#timeWindow").css("display", "none");
		$("#button").css("display", "none");
		$("#progressBar").css("display", "block");
		$("#timedisplay").css("display", "block");
		$("#stopbtn").css("display", "block");
	},
	updateValues: function (newHH, newMM, newSS) {
		chrome.storage.sync.get(['initialHH', 'initialMM'], (res) => {
			let tot = this.totalSecs(res.initialHH, res.initialMM, 0);
			let precentage = (this.totalSecs(newHH, newMM, newSS) / Number(tot)) * 100;
			console.log(precentage);
			$("#l").css("width", 100 - precentage + '%');
			$("#timedisplay").html(`${this.displayAble(newHH)}:${this.displayAble(newMM)}:${this.displayAble(newSS)}`);
			console.log(`hh:${this.displayAble(newHH)}, mm:${this.displayAble(newMM)}, ss:${this.displayAble(newSS)}`);
		});
	},
	timeInputMode: function () {
		$("#head2").css("display", "block");
		$("#timeWindow").css("display", "block");
		$("#button").css("display", "block");
		$("#progressBar").css("display", "none");
		$("#timedisplay").css("display", "none");
		$("#stopbtn").css("display", "none");
	},
	totalSecs: function (hh, mm, ss) {//todo
		return Number((Number(hh)*3600) + (Number(mm)*60) + Number(ss)); // not correct: debug mode
	},
	displayAble: function(num){
		if(num<10)
			return '0'+num;
		else
			return num;
	}
}