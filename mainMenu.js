if (localStorage.getItem("trueTileDesign") === null){
    localStorage.setItem("trueTileDesign", `<img src="icons/smileWhite.png" height="50" class="trueTile">`);
    localStorage.setItem("falseTileDesign", `<img src="icons/smileBlack.png" height="50" class="falseTile">`);
    localStorage.setItem("myTileTrueDesign", `<img src="icons/smileWhite.png" height="50">`);
    localStorage.setItem("myTileFalseDesign", `<img src="icons/smileBlack.png" height="50">`);
}


$('.menuOption').eq(0).click(()=>{
    getBodyContent("rooms", "rooms");
})

$('.menuOption').eq(1).click(()=>{
    getBodyContent("settings", "settings");
})


checkPlayerName();