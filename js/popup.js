var startButton = document.getElementById("button");
startButton.addEventListener("click", () => {
	var hh = document.getElementById("iphr");
	var mm = document.getElementById("ipmin");
	var totalSecs = mm.value;
	console.log(mm.value);
	var timeout = setTimeout(timesUp(totalSecs), totalSecs * 1000);
});

function timesUp(totalSecs) {
	alert("times up! " + totalSecs);
}