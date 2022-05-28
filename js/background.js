chrome.runtime.onMessage.addListener((message) => {
	let hhh = -1, mmm = -1;
	if (message.status === "start") {
		console.log("timer started!");
		console.log(`values are: hh:${message.hh} mm:${message.mm}`);
		hhh = message.hh;
		mmm = message.mm;
		console.log(`time: ${hhh}: ${mmm}`);
		let totalTime = bg.totalSecs(hhh, mmm);
		totalTime -= 1;
		bg.check = setInterval(() => {
			if (totalTime == 0) {
				bg.stopTimer();
			} 
			else {
				let newHH=Math.floor(Number(totalTime/ 60));
				let newMM=Math.floor(Number(totalTime% 60));
				chrome.storage.sync.set({hh: newHH, mm: newMM});
				chrome.runtime.sendMessage({
					isCompleted: false,
					hh: newHH,
					mm: newMM
				});
				totalTime -= 1;
			}
		}, 1000);
	}
	else if (message.status === "stop") {
		bg.stopTimer();
	}
	return true;
});
let bg = {
	check: 0,
	stopTimer: function () {
		clearInterval(bg.check);
		chrome.storage.sync.set({ 'status': "waiting" });
		console.log("times up!");
		chrome.runtime.sendMessage({
			isCompleted: true
		});
	},
	totalSecs: function (hh, mm) {
		return (Number(hh * 60) + Number(mm)); // not correct: debug mode
	}
}