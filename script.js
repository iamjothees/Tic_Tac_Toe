let mainMenuFlag = false;
let gameBoxFlag = false;
let roomsFlag = false;
let settingsFlag = false;
let resetter;

//For mainMenuJS
let isRoomAvailable;
let roomNameSlctr;

//For getNameJS
let askMyNameDB;
let myName;
let opponentName;
let oppAvl;

//For Rooms
let roomRefresh;

//For gameBoxJS
let timerCount;
let timeCounter;
let tilesValue;
let whoseTurn;
let inputs;
let isStarted;
let winner;
let gameBoxRefresh;
let tilesPreviousValue;
let tilesCurrentValue;
let isStartedFlag;


$('body').attr('onload', `getBodyContent("mainMenu", "mainMenu")`);

function resetDbCaller(){
	resetter = setTimeout(resetGame, 35000, localStorage.getItem('whoAmI'));
}

window.onbeforeunload = function(){
	resetGame();
}

function myAlert(message){
	$("#message").html(message);
			$("#alert").css("display", "flex");
			setTimeout(()=>$("#alert").hide(), 4000);
}

function resetGame(whoseRequest=" "){
	clearTimeout(resetter);
	//ADD SHOW TIMER

	//if (whoseRequest === " " || whoseRequest === localStorage.getItem('whoAmI'))
		clearInterval(gameBoxRefresh);

    const req = new XMLHttpRequest();
    req.onload = function(){

		if (whoseRequest !== " "){
			setTimeout(resetGame,1000, " ");
			if (whoseRequest !== localStorage.getItem('whoAmI') ){
				myAlert(`${opponentName} left the game`);
				opponentName = "";
			}
		}
		//console.warn(`${whoseRequest} !== ${localStorage.getItem('whoAmI')} && ${this.responseText} !== "Exit"`);
		
		/*mainMenuFlag = (whoseRequest === " ") ? getBodyContent("mainMenu", "mainMenu", mainMenuFlag) : mainMenuFlag;
		(whoseRequest === " ") ? localStorage.removeItem('whoAmI') : "";*/

		getBodyContent("mainMenu", "mainMenu");
		localStorage.removeItem('whoAmI');

		$("body").css("background-color", "black");
		$("#bgContainer").show();
    };

	req.open("POST", `resetGame.php?whoseRequest=${whoseRequest}`);
    req.send();
}

function resetTiles(whoseTurn){
	clearTimeout(resetter);
	setTimeout(resetter, 35000);
    const req = new XMLHttpRequest();
    req.onload = function(){
		//$('#confetti').hide();
		//alert(this.responseText);
	};
    req.open("GET", `resetTiles.php?whoseTurn=${whoseTurn}`);
    req.send();
}

function getBodyContent(pageFileName, jsFileName=""){
	for (i=1; i<99; i++)
		clearInterval(i);
	$("#body").load(`${pageFileName}.html`, () => {
		includeScript(jsFileName);
		$(window).scrollTop(0);
	});
	
}

/* Insert secondary page's script */
function includeScript(jsFileName){
	if (jsFileName !== "")
		$("<script>").attr("src", `${jsFileName}.js`).appendTo('#body');
}


/* function getBodyContent(pageFileName, jsFileName, flag){

	const req = new XMLHttpRequest();
	req.onload = function(){
		$('#body').html(this.responseText);
		//if (!flag)
			includeScript(jsFileName);
		$(window).scrollTop(0);
	};
	req.open("GET", pageFileName+".html");
	req.send();

	return true;
}

/* Insert secondary page's script *
function includeScript(jsFileName){
	var script = document.createElement('script');
/*  script.type = 'text/javascript';
	script.setAttribute('src', jsFileName+".js");
	script.setAttribute('id', jsFileName);
	$('body').append(script);
}


function removeScript(jsId){
	$(`#${jsId}`).remove();
} */