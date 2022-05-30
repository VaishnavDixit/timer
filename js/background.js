chrome.runtime.onMessage.addListener((message) => {
	if (message.status === "start") {
		console.log("timer started!");
		let hhh = Number(message.hh);
		let mmm = Number(message.mm);
		console.log(`values are: hh:${hhh} mm:${mmm}`);
		let totalTime = bg.totalSecs(hhh, mmm, 0)-1;
		bg.check = setInterval(() => {
			console.log(`->${totalTime}`)
			if (totalTime === 0) {
				bg.stopTimer();
			}
			else {
				let newHH=Math.floor(totalTime/3600);
				let newMM=Math.floor((totalTime%3600)/60);
				let newSS=totalTime%3600%60;
				chrome.runtime.sendMessage({
					isCompleted: false,
					hh: newHH,
					mm: newMM,
					ss: newSS
				});
				chrome.storage.sync.set({hh: newHH, mm: newMM,  ss: newSS});
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
		chrome.storage.sync.set({ 'isRunning': false });
		console.log("times up!");
		chrome.runtime.sendMessage({
			isCompleted: true
		});
	},
	totalSecs: function (hh, mm,ss) {//todo
		return Number((Number(hh)*3600) + (Number(mm)*60)+Number(ss)); // not correct: debug mode
	}
}