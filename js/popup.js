var startButton = document.getElementById("button");
var timetext = document.getElementById("timedisplay");
var timeD = document.getElementById("timediv");
var stopBtn=document.getElementById("stopbtn");
var text=document.getElementById("head2");
var timeWindow=document.getElementById("timeWindow");

startButton.addEventListener("click", () => {
	startButton.style.display = "none";
	timeWindow.style.display = "none";
	text.style.display = "none";
	var hh = parseInt(document.getElementById("iphr").value);
	var mm = parseInt(document.getElementById("ipmin").value);
	document.getElementById("ipmin").value=0;
	document.getElementById("iphr").value=0;
	var totalSecs = (hh * 3600) + mm*60;
	timeD.style.display="block";
	timetext.innerHTML = "Time: " + Math.floor(totalSecs / 3600) + ':' + (Math.floor((totalSecs % 3600) / 60)<10?"0":"") + Math.floor((totalSecs % 3600) / 60)+":"+ (Math.floor(totalSecs % 60)<10?"0":"")+Math.floor(totalSecs % 60);
	stopBtn.addEventListener("click",function(){
		clearInterval(check);
		timeD.style.display="none";
		timeWindow.style.display = "block";
		text.style.display = "block";
		startButton.style.display = "block";
		//alert("times up!");
	});
	var check = setInterval(function () {
		totalSecs -= 1;
		if (totalSecs < 0) {
			clearInterval(check);
			timeD.style.display="none";
			timeWindow.style.display = "block";
			text.style.display = "block";
			startButton.style.display = "block";
			alert("times up!");
		}
		timetext.innerHTML = "Time: " + Math.floor(totalSecs / 3600) + ':' + (Math.floor((totalSecs % 3600) / 60)<10?"0":"") + Math.floor((totalSecs % 3600) / 60)+":"+ (Math.floor(totalSecs % 60)<10?"0":"")+Math.floor(totalSecs % 60);
	}, 1000);
});
