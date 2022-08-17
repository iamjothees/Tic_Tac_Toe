tilesValue = [];
//whoseTurn = "Player One";
inputs = 0;
isStarted = "0";
isStartedFlag = "0";
winner = "";
oppAvl = "";
tilesPreviousValue = ["","","","","","","","",""];
timerCount = Number(35);

for (var i=0; i<$(".tiles").length; i++){
    (function(i){
        $('.tiles').eq(i).html(localStorage.getItem("trueTileDesign") + localStorage.getItem("falseTileDesign") );
    })(i);
}

//Assign input() to all Tiles
for (var i=0; i<9; i++){
	(function(i){
		$('.tiles').eq(i).click(  ()=>{
            if( whoseTurn === localStorage.getItem('whoAmI') )
                input(i);
        })
	})(i);
}


//Reset Button action
$('#reset').click(()=>{
    resetGame(localStorage.getItem('whoAmI'));
    //resetGame();
    //setTimeout(resetGame,600);
})

if (localStorage.getItem('whoAmI') === "Player One")
    $('#myTileValue').html(localStorage.getItem('myTileTrueDesign'));
else if (localStorage.getItem('whoAmI') === "Player Two")
    $('#myTileValue').html(localStorage.getItem('myTileFalseDesign'));

gameBoxRefresh = setInterval(refresh,300);

/* timeCounter = setInterval(()=>{
    $("#timer").text(timerCount--);
},1000); */

function refresh(){
    whoseTurnFunc();
    updateFromDB();
    checkTiles();
    //checkEndOfInput();

    //Resetter for inactive
    console.table(`${tilesPreviousValue !== tilesCurrentValue}`);
    if (tilesPreviousValue !== tilesCurrentValue){
        console.log("Cleared");
        clearTimeout(resetter);
        clearInterval(timeCounter);
        timerCount = Number(15);
        resetter = setTimeout(()=>{
            console.log(" bello");
            resetGame(localStorage.getItem('whoAmI'));
        },15000);
        timeCounter = setInterval(()=>{
            $("#timer").text(timerCount--);
        },1000);
        tilesPreviousValue = tilesCurrentValue;
    }
    
    

    /* const req = new XMLHttpRequest();
    req.onload = function(){
        isStarted = this.responseText;
        /* if(isStarted === '1'){
            //updateFromDB();
        } *
        checkTiles();
    }
    req.open("POST", `isStarted.php`);
    req.send(); */
}

function whoseTurnFunc(){
    const req = new XMLHttpRequest();
    req.onload =function(){
        whoseTurn = this.responseText;
        isMyTurnColor();
    };
    req.open("POST", "whoseTurn.php");
    req.send();
}

function isMyTurnColor(){
    if( whoseTurn === localStorage.getItem('whoAmI') ){
        $('.isMyTurn').css("background-color", "green");
    }else{
        $('.isMyTurn').css("background-color", "red");
    }
}

function updateFromDB(){
    const req = new XMLHttpRequest();
    req.onload = function(){
        let res = JSON.parse(this.responseText);
        //console.table(JSON.parse(this.responseText));

        
        /*console.log("isstarted = " + isStartedFlag);
        if (isStartedFlag === "0"){
            console.log(("Players" + res.p1Name +"  "+ res.p2Name))
            setOpponentName(res.p1Name, res.p2Name);
            isStartedFlag = res.isStarted;
        }*/

        checkOpponentAvailable(res.isStarted, res.playerOne, res.playerTwo);

        
        //PUT THESE INTO FUNCTION
        tilesCurrentValue = res.tilesValue;
        tilesValue = JSON.parse(res.tilesValue);
        updateTilesValue(tilesValue);
        //alert();
        //tilesValue = JSON.parse(this.responseText);

        if (isStartedFlag === "0"){
            setOpponentName(res.p1Name, res.p2Name);
            if (res.isStarted === "1")
            isStartedFlag = "1";
        }
    }
    req.open("POST",`updateFromDB.php`);
    req.send();
}

function setOpponentName(p1Name, p2Name){
    if (localStorage.getItem('whoAmI') === "Player One"){
        opponentName = p2Name;
    }
    else if (localStorage.getItem('whoAmI') === "Player Two"){
        opponentName = p1Name;
    }
}

function checkOpponentAvailable(isStarted, p1Avl, p2Avl){
    if(isStarted === '1'){
        if (localStorage.getItem('whoAmI') === "Player One"){
            oppAvl = p2Avl;
        }
        else if(localStorage.getItem('whoAmI') === "Player Two"){
            oppAvl = p1Avl;
        }

        if (oppAvl === "0"){
            //$('.result').text(`${opponentName} Left`);
            let whoseRequest =  (localStorage.getItem('whoAmI') === "Player One") ? "Player Two" :
                                (localStorage.getItem('whoAmI') === "Player Two") ? "Player One" : "";
            resetGame(whoseRequest);
            //resetGame();
        }
    }
}

function updateTilesValue(tilesValue){
    for(let i=0; i<9; i++){
        if(tilesValue[i] === "true"){
            $(".trueTile").eq(i).show();
            $('.tiles').eq(i).val("true");
        }
        if(tilesValue[i] === "false"){
            $(".falseTile").eq(i).show();
            $('.tiles').eq(i).val("false");
        }
        if(tilesValue[i] === ""){
            $(".trueTile").eq(i).hide();
            $(".falseTile").eq(i).hide();
            $('.tiles').eq(i).val("");
        }
    }
}

function checkTiles(){
    loop1:
    for(i=0; i<9; i++){
        if (tilesValue[i] === null) continue;
        switch(i){
            case 0:
                if (    (tilesValue[i]==tilesValue[i+1] && tilesValue[i]==tilesValue[i+2]) ||
                        (tilesValue[i]==tilesValue[i+3] && tilesValue[i]==tilesValue[i+6]) ||
                        (tilesValue[i]==tilesValue[i+4] && tilesValue[i]==tilesValue[i+8])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                            
                        }
                break;

            case 1:
                if (    (tilesValue[i]==tilesValue[i-1] && tilesValue[i]==tilesValue[i+1]) ||
                        (tilesValue[i]==tilesValue[i+3] && tilesValue[i]==tilesValue[i+6])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;

            case 2:
                if (    (tilesValue[i]==tilesValue[i-1] && tilesValue[i]==tilesValue[i-2]) ||
                        (tilesValue[i]==tilesValue[i+3] && tilesValue[i]==tilesValue[i+6]) ||
                        (tilesValue[i]==tilesValue[i+2] && tilesValue[i]==tilesValue[i+4])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;

            case 3:
                if (    (tilesValue[i]==tilesValue[i+1] && tilesValue[i]==tilesValue[i+2]) ||
                        (tilesValue[i]==tilesValue[i-3] && tilesValue[i]==tilesValue[i+3])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;

            case 4:
                if (    (tilesValue[i]==tilesValue[i-3] && tilesValue[i]==tilesValue[i+3]) ||
                        (tilesValue[i]==tilesValue[i-1] && tilesValue[i]==tilesValue[i+1]) ||
                        (tilesValue[i]==tilesValue[i-4] && tilesValue[i]==tilesValue[i+4]) ||
                        (tilesValue[i]==tilesValue[i-2] && tilesValue[i]==tilesValue[i+2])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;

            case 5:
                if (    (tilesValue[i]==tilesValue[i-1] && tilesValue[i]==tilesValue[i-2]) ||
                        (tilesValue[i]==tilesValue[i-3] && tilesValue[i]==tilesValue[i+3])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;

            case 6:
                if (    (tilesValue[i]==tilesValue[i-3] && tilesValue[i]==tilesValue[i-6]) ||
                        (tilesValue[i]==tilesValue[i-2] && tilesValue[i]==tilesValue[i-4]) ||
                        (tilesValue[i]==tilesValue[i+1] && tilesValue[i]==tilesValue[i+2])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;

            case 7:
                if (    (tilesValue[i]==tilesValue[i-3] && tilesValue[i]==tilesValue[i-6]) ||
                        (tilesValue[i]==tilesValue[i-1] && tilesValue[i]==tilesValue[i+1])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;

            case 8:
                if (    (tilesValue[i]==tilesValue[i-3] && tilesValue[i]==tilesValue[i-6]) ||
                        (tilesValue[i]==tilesValue[i-4] && tilesValue[i]==tilesValue[i-8]) ||
                        (tilesValue[i]==tilesValue[i-1] && tilesValue[i]==tilesValue[i-2])  ){
                            checkWinner(tilesValue[i]);
                            break loop1;
                        }
                break;
        }
    }
}

function checkWinner(tileValue){
    if (tileValue === "true"){
        winner="Player One";
    }
    else if (tileValue === "false"){
        winner ="Player Two";
    }
    else{
        return;
        //winner = "";
    }
    //winner = (tileValue === "true")?"Player One":((tileValue === "false")?"Player Two":"");
    //if (winner === "")  return;
    if(winner === localStorage.getItem('whoAmI')){
        $('#confetti').show();
        setTimeout(()=>$('#confetti').hide(), 5000);
        myAlert(`You Won`);
        //alert(`${myName} Wins`);
        setTimeout(resetTiles, 4000, winner);
        winner="";
        updateFromDB();
    }
    else{
        myAlert(`${opponentName} Wins`);
        //alert(`${opponentName} Wins`);
        setTimeout(resetTiles, 4000, winner);
        winner="";
        updateFromDB();
    }
}

function checkEndOfInput(){
    //console.warn(`inputs - ${inputs}`);
    for (var i = 0; i<9; i++){
        //console.warn(`curTtileVal - ${tilesCurrentValue[i]}`);
        if (tilesCurrentValue[i] === "true" || tilesCurrentValue[i] === "false"){
            inputs++;
        }
    }
    if (inputs>8 && winner === ""){
        myAlert("Draw");
    }
}

function announceResult(isPlayerOne){
    //For announce result
    if (isPlayerOne){
        
    }
}




function input(id){
    activeTile = $('.tiles').eq(id);
    if (activeTile.val()!=="true" && activeTile.val()!=="false"){
        changeTileValue(id);
        changeTurn();
//        inputs++;
    }
/*     if (inputs>8){
        announceResult("End of input");
        setTimeout(reset, 3000);
    } */
}

function changeTurn(){
    const req = new XMLHttpRequest();
    req.onload =function(){
        
    };
    req.open("POST", `changeTurn.php?player=${localStorage.getItem('whoAmI')}`);
    req.send();
}

function changeTileValue(i){
    //Just For checking
    if(localStorage.getItem('whoAmI') === "Player One"){
        $(".trueTile").eq(i).show();
        $('.tiles').eq(i).val("true");
        lastInput = true;
    }else{
        $(".falseTile").eq(i).show();
        $('.tiles').eq(i).val("false");
        lastInput = false;
    }
    uploadTileValue();
}

function uploadTileValue(){
    setTilesValue();
    const req = new XMLHttpRequest();
    req.onload = function(){
        //isStarted = this.responseText;
    }
    req.open("POST", `uploadTilesValue.php/?JSONTilesValue=${JSON.stringify(tilesValue)}`);
    req.send();
}

function setTilesValue(){
    for (let i=0; i<9; i++){
        tilesValue[i] = $('.tiles').eq(i).val();
    }
}
