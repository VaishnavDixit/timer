var startButton = document.getElementById("button");
var timetext=document.getElementById("timedisplay");
startButton.addEventListener("click", () => {
	timetext.style.display="";
	var hh = document.getElementById("iphr");
	var mm = document.getElementById("ipmin");
	var totalSecs = mm.value;
	console.log(mm.value);
	var check = setInterval(function(){
		if(totalSecs==0){
			clearInterval(check);
			alert("times up!");
		}
		timetext.innerHTML="time :"+totalSecs;
		totalSecs-=1;
	}, 1000);
});
