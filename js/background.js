
// chrome.storage.onChanged.addListener(function (changes, namespace) {
// 	for (let [key, {
// 		oldValue,
// 		newValue
// 	}] of Object.entries(changes)) {
// 		if (key === 'isClicked') {
// 			chrome.storage.sync.set({
// 				'isClicked': false
// 			});
// 			console.log("clicked!!!");
// 		}
// 	}
// });

chrome.runtime.onMessage.addListener((message, _, sendResponse ) => {
	//const tabId = getForegroundTabId();
	if (message.data === "Start the timer") {
		console.log("clicked btn!!!!");
		sendResponse({farewell: "goodbye"});
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