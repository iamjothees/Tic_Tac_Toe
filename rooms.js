
roomRefresh = setInterval(refresh, 1000);

function refresh(){
    isRoomAvailableFunc();
}

function isRoomAvailableFunc(){
    const req = new XMLHttpRequest();
    req.onload = function(){
        console.log(this.responseText);
        isRoomAvailable = JSON.parse(this.responseText);
        changeAvailability();
    }
    req.open("GET", "isRoomAvailable.php");
    req.send();
}

roomNameSlctr = $('.roomNameSlctr');
function changeAvailability(){
    isRoomAvailable.forEach((val, i)=>{
        if (val === "0"){
            roomNameSlctr.eq(i).attr('onclick', `enterRoom(${i})`);
        }else if (val === "1"){
            $('.block').eq(i).css("background-color", "grey");
            $('.block').eq(i).css("box-shadow", "0 0 0 black");
            roomNameSlctr.eq(i).attr('onclick', `alert("Already  Filled")`);
        }
    });
}

function enterRoom(no){
    animateEnteringRoom(no);
    let roomName = $('.roomNameSlctr').eq(no).html();
    console.log("room name - " + roomName);
    connectToPHP(roomName);
    //setTimeout(resetDbCaller, roomName, 10000)
}

function connectToPHP(roomName){
    const req = new XMLHttpRequest();
    req.onload = function(){
        clearInterval(roomRefresh);
        resetDbCaller();
        localStorage.setItem("whoAmI", this.responseText)
        setTimeout(()=>{
            getBodyContent("gameBox", "gameBox");
        }, 1000)
    };
    //myName = "Dhee";
    console.log("enter room" + roomName);
    req.open("GET", `EnterRoom.php?roomName=${roomName}&myName=${myName}`);
    req.send();
}

function animateEnteringRoom(no){
    console.log(`out - ${no}`);
    let bgColor = roomNameSlctr.eq(no).css("background-color");
    console.log(bgColor);
    roomNameSlctr.eq(no).css({   "z-index" : "9"});
    var i=0;
    const animate = setInterval(()=>{
        if (i===200)
            clearInterval(animate);
        roomNameSlctr.eq(no).css({
            "box-shadow" : `0px 0px ${i*2}vw ${i}vw ` + bgColor
        });
        i++;
    },2);
    $("body").css({"background-color" : bgColor});
    $("#bgContainer").hide();
}