/* if (localStorage.getItem("myName") === null){
    localStorage.setItem("myName", makeid());
} */

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

if (localStorage.getItem("myName") === null){
    $("#userName").val(makeid());
}
else{
    $("#userName").val(localStorage.getItem("myName"));
}
function save(){
    let trueTileTag, falseTileTag, mytileTrueTag, mytileFalseTag;
    localStorage.setItem("myName", $("#userName").val());
    const tileDesign = $("input[name='tileDesign']:checked").val();
    if (tileDesign === "XO"){
        trueTileTag = `<span class="trueTile">X</span>`;
        falseTileTag = `<span class="falseTile">O</span>`;
        mytileTrueTag = `<span>X</span>`;
        mytileFalseTag = `<span>O</span>`;
    }
    else if (tileDesign === "B/W_smiley"){
        trueTileTag = `<img src="icons/smileWhite.png" height="50" class="trueTile">`;
        falseTileTag = `<img src="icons/smileBlack.png" height="50" class="falseTile">`;
        mytileTrueTag = `<img src="icons/smileWhite.png" height="50">`
        mytileFalseTag = `<img src="icons/smileBlack.png" height="50">`
    }

    else if (tileDesign === "colors"){
        trueTileTag = `<span style='display: inline-block; background-color: ${$("#clrPkrTrueTile").val()}; height:.8em; width: .8em;' class="trueTile"></span>`;
        falseTileTag = `<span style='display: inline-block; background-color: ${$("#clrPkrFalseTile").val()}; height:.8em; width: .8em;' class="falseTile"></span>`;
        mytileTrueTag = `<span style='display: inline-block; background-color: ${$("#clrPkrTrueTile").val()}; height:.8em; width: .8em;'></span>`;
        mytileFalseTag = `<span style='display: inline-block; background-color: ${$("#clrPkrFalseTile").val()}; height:.8em; width: .8em;'"></span>`;
    }

    localStorage.setItem("trueTileDesign", trueTileTag);
    localStorage.setItem("falseTileDesign", falseTileTag);
    localStorage.setItem("myTileTrueDesign", mytileTrueTag);
    localStorage.setItem("myTileFalseDesign", mytileFalseTag);

    //console.log(localStorage.getItem("tileDesign"));
    //To show
    for (var i = 0; i < localStorage.length; i++){
        console.log(localStorage.getItem(localStorage.key(i))+ "   ");
    }


    getBodyContent("mainMenu", "mainMenu");
}
 function cancel(){
    getBodyContent("mainMenu", "mainMenu");
 }

