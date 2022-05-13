var startButton = document.getElementById("button");
var timetext = document.getElementById("timedisplay");
var timeD = document.getElementById("timediv");
var stopBtn=document.getElementById("stopbtn");
startButton.addEventListener("click", () => {
	startButton.style.display = "none";
	var hh = parseInt(document.getElementById("iphr").value);
	var mm = parseInt(document.getElementById("ipmin").value);	
	var totalSecs = (hh * 3600) + mm*60;
	timeD.style.display="block";
	timetext.innerHTML = "Time: " + Math.floor(totalSecs / 3600) + ':' + (Math.floor((totalSecs % 3600) / 60)<10?"0":"") + Math.floor((totalSecs % 3600) / 60)+":"+ (Math.floor(totalSecs % 60)<10?"0":"")+Math.floor(totalSecs % 60);
	stopBtn.addEventListener("click",function(){
		clearInterval(check);
		timeD.style.display="none";
		startButton.style.display = "";
		//alert("times up!");
	});
	var check = setInterval(function () {
		totalSecs -= 1;
		if (totalSecs < 0) {
			clearInterval(check);
			timeD.style.display="none";
			startButton.style.display = "";
			alert("times up!");
		}
		timetext.innerHTML = "Time: " + Math.floor(totalSecs / 3600) + ':' + (Math.floor((totalSecs % 3600) / 60)<10?"0":"") + Math.floor((totalSecs % 3600) / 60)+":"+ (Math.floor(totalSecs % 60)<10?"0":"")+Math.floor(totalSecs % 60);
	}, 1000);
});
