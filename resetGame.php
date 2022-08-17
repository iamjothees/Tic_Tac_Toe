<?php
    session_start();
    include 'ConnectDB.php';

    $whoseRequest = $_REQUEST['whoseRequest'];
    //echo $whoseRequest;

    $setPlayerName = (empty($whoseRequest)) ? "`P1Name`='Player One', `P2Name`='Player Two', ":
                     (($whoseRequest == "Player One") ? "`P1Name`='Player One', " :
                    (($whoseRequest == "Player Two") ? "`P2Name`='Player Two', " : ""));

    $setPlayerAvl = (empty($whoseRequest)) ? "`PlayerOne`='0', `PlayerTwo`='0', " :
                    (($whoseRequest == "Player One") ? "`PlayerOne`='0', " :
                    (($whoseRequest == "Player Two") ? "`PlayerTwo`='0', " : ""));
    
    $setIsStarted = (empty($whoseRequest)) ? "IsStarted='0'" : "IsStarted='1'";


    $emptyArray = '["","","","","","","","",""]';
    
    
    $query = "SELECT `P1Name`, `P2Name` FROM AvailableRooms WHERE `Name` = '$_SESSION[roomName]' ";
    $result = $conn->query($query);
    while ($resultRow = $result->fetch_assoc()){
        $p1Name = $resultRow['P1Name'];
        $p2Name = $resultRow['P2Name'];
    }
    
    
    $query = "UPDATE `AvailableRooms` SET $setPlayerName $setPlayerAvl `WhoseTurn`='Player One', `TilesValue`='$emptyArray', $setIsStarted WHERE `Name`='$_SESSION[roomName]'";
    $conn->query($query);

    //echo "Player Name" . $_SESSION['myName'];
    echo "P1-" . $p1Name . "P2-" . $p2Name;
    
    $responseText = ($whoseRequest == "Player One") ?
                        (($p1Name == $_SESSION['myName']) ? "Exits the game" : "$ left the Room") :
                    (($whoseRequest == "Player Two") ? 
                        (($p2Name == $_SESSION['myName']) ? "Exits the game" : "$_SESSION[myName] left the Room") : 
                    ((empty($whoseRequest)) ? "Exit":""));

    //echo $responseText;
    //echo $query;
    //echo "who" . $whoseRequest;

    (empty($whoseRequest)) ? session_destroy() : "";
?>