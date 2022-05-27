
// chrome.storage.onChanged.addListener(function (changes, namespace) {
// 	for (let [key, {
// 		oldValue,
// 		newValue
// 	}] of Object.entries(changes)) {
// 		if (key === 'hh') {

// 			console.log("clicked!!!");
// 		}
// 	}
// });

//message passing
chrome.runtime.onMessage.addListener((message) => {
	let hhh=-1, mmm=-1;
	if (message.status === "start") {
		console.log("msg received");
		console.log(`values are: hh:${message.hh} mm:${message.mm}`);
		hhh = message.hh;
		mmm = message.mm;
		console.log(`time: ${hhh}: ${mmm}`);
		let totalTime = (hhh * 60 + mmm); // time in mill sec (debug mode)
		let check = setInterval(() => {
			chrome.runtime.sendMessage({
				tot: totalTime,
				isCompleted: false
			});
			totalTime -= 1;
			if (totalTime == 0) {
				console.log("times up");
				chrome.runtime.sendMessage({
					isCompleted: true
				});
				clearInterval(check);
			}
		}, 1000);
		
	}
});

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