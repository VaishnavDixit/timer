var startButton = document.getElementsByClassName("button");
startButton[0].addEventListener("click", () => {
	//alert("clicked");
	var hh = document.getElementById("iphr");
	var mm = document.getElementById("ipmin");
	var totalSecs = mm.value;
	console.log(mm.value);
	var timeout = setTimeout(timesUp(totalSecs), totalSecs * 1000);
});
//mm == sec
function timesUp(mins) {
	alert("times up!"+ mins);
}