var check=0;
chrome.runtime.onMessage.addListener((message) => {
	let hhh = -1, mmm = -1;
	if (message.status === "start") {
		console.log("msg received");
		console.log(`values are: hh:${message.hh} mm:${message.mm}`);
		hhh = message.hh;
		mmm = message.mm;
		console.log(`time: ${hhh}: ${mmm}`);
		let totalTime = totalSecs(hhh, mmm); // time in mill sec (debug mode)
		totalTime -= 1;
		check = setInterval(() => {
			if (totalTime == 0) {
				stopTimer(check);
			} else {
				chrome.runtime.sendMessage({
					tot: totalTime,
					isCompleted: false
				});
				totalTime -= 1;
			}
		}, 1000);
	}
	else if (message.status === "stop") {
		console.log("stop button pressed")
		stopTimer(check);
	}
	return true;
	//return Promise.resolve("Dummy response to keep the console quiet");
});

function stopTimer(check) {
	clearInterval(check);
	console.log("times up!");
	chrome.runtime.sendMessage({
		isCompleted: true
	});
}

function totalSecs(hh, mm){
	return ((hh * 60) + mm); // not correct: debug mode
}


// startButton.style.display = "none";
// 	timeWindow.style.display = "none";
// 	text.style.display = "none";
// 	var hh = parseInt(document.getElementById("iphr").value);
// 	var mm = parseInt(document.getElementById("ipmin").value);
// 	document.getElementById("ipmin").value=0;
// 	document.getElementById("iphr").value=0;
// 	var totalSecs = (hh * 3600) + mm*60;
// 	timeD.style.display="block";
// 	timetext.innerHTML = "Time: " + Math.floor(totalSecs / 3600) + ':' + (Math.floor((totalSecs % 3600) / 60)<10?"0":"") + Math.floor((totalSecs % 3600) / 60)+":"+ (Math.floor(totalSecs % 60)<10?"0":"")+Math.floor(totalSecs % 60);
// 	stopBtn.addEventListener("click",function(){
// 		clearInterval(check);
// 		timeD.style.display="none";
// 		timeWindow.style.display = "block";
// 		text.style.display = "block";
// 		startButton.style.display = "block";
// 		//alert("times up!");
// 	});
// 	var check = setInterval(function () {
// 		totalSecs -= 1;
// 		if (totalSecs < 0) {
// 			clearInterval(check);
// 			timeD.style.display="none";
// 			timeWindow.style.display = "block";
// 			text.style.display = "block";
// 			startButton.style.display = "block";
// 			alert("times up!");
// 		}
// 		timetext.innerHTML = "Time: " + Math.floor(totalSecs / 3600) + ':' + (Math.floor((totalSecs % 3600) / 60)<10?"0":"") + Math.floor((totalSecs % 3600) / 60)+":"+ (Math.floor(totalSecs % 60)<10?"0":"")+Math.floor(totalSecs % 60);
// 	}, 1000);