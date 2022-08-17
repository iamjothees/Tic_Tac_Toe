myName = localStorage.getItem("myName");
//DialogueBox For myName
askMyNameDB =               "<div class='bg'></div>"
askMyNameDB = askMyNameDB + "<div class='playerNameCollectorContainer'>"
askMyNameDB = askMyNameDB +     "<div id='form'>"
askMyNameDB = askMyNameDB +         "<span id='skip' onclick='clearDialogueBox()'>X</span>"
askMyNameDB = askMyNameDB +         "May I know your Name?<br>"
askMyNameDB = askMyNameDB +         "<input type='text' id='nameTextBox' size='15' required value='' autocomplete='name'><br>"
askMyNameDB = askMyNameDB +         "<button id='sendButton' onclick='saveName();'> Next </button>"
askMyNameDB = askMyNameDB +     "</div>"
askMyNameDB = askMyNameDB + "</div>";

function checkPlayerName(){
    console.log(myName);
    if (myName === null){
        createDialogueBox(askMyNameDB);
    }
}

function createDialogueBox(dialogueBoxContent){
    const playerNameCollector = document.getElementById("playerNameCollector");
    playerNameCollector.innerHTML = dialogueBoxContent;
}

function clearDialogueBox(){
    const playerNameCollector = document.getElementById("playerNameCollector");
    playerNameCollector.innerHTML = "";
}

/************************************************/


function saveName(){
    const currentName = document.getElementById("nameTextBox").value;

    //Format validation
    if ((currentName !== "")){
        //set local storage
        localStorage.setItem("myName", currentName);
        myName = localStorage.getItem("myName");
        clearDialogueBox();
        //saveToDB();
    }
}

/* function removeName(){
    localStorage.removeItem("myName");
} */




/***********************************************************************************************/
/* SaveAddressToDB */
function saveAddressToDB(){
    const customerName = document.getElementsByName('customerName')[0].value;
    const addressLine1 = document.getElementsByName('addressLine1')[0].value;
    const addressLine2 = document.getElementsByName('addressLine2')[0].value;
    const city = document.getElementsByName('city')[0].value;
    const pinCode = document.getElementsByName('pinCode')[0].value;
    console.log()
    /* console.log(`SaveCustomerDetail.php?custName=${customerName}?addLn1=${addressLine1}?addLn2=${addressLine2}?city=${city}?pinCode=${pinCode}`); */
    if ((customerName === '') || (addressLine1 == '') || (city == '') || (pinCode == ''))    return;
    console.log("passed");

    const xHttp = new XMLHttpRequest();
    xHttp.onload = function(){ alert(this.responseText); console.log(this.responseText);  };
    xHttp.open("POST", `SaveCustomerDetail.php?custName=${customerName}&addLn1=${addressLine1}&addLn2=${addressLine2}&city=${city}&pinCode=${pinCode}&mobileNumber=${localStorage.getItem('mobileNumber')}`);
    xHttp.send();
    
    clearDialogueBox();
}
