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
		console.log(hh);
		console.log(mm);
		// chrome.storage.sync.set({
		// 	'hh': hh,
		// 	'mm': mm
		// });	
		chrome.runtime.sendMessage({
			//data: "Start the timer",
			hh: hh,
			mm: mm
		});
	})
})

chrome.runtime.onMessage.addListener((message) => {
	if (message.status === "ok")
		alert("completed");
	return true;
});