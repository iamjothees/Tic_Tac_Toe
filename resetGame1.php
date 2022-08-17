<?php
    session_start();
    include 'ConnectDB.php';

    $whoseRequest = $_REQUEST['whoseRequest'];

    $setPlayerName = (empty($whoseRequest)) ? "`P1Name`='Player One', `P2Name`='Player Two', " : "";
                     (($whoseRequest == "Player One") ? "`P1Name`='Player One'" :
                     (($whoseRequest == "Player Two") ? "`PlayerTwo`='0'" : ""));

    $setPlayerAvl = (empty($whoseRequest)) ? "`PlayerOne`='0', `PlayerTwo`='0'" : 
                    (($whoseRequest == "Player One") ? "`PlayerOne`='0'" :
                    (($whoseRequest == "Player Two") ? "`PlayerTwo`='0'" : ""));
    
    $setIsStarted = (empty($whoseRequest)) ? "IsStarted='0'" : "IsStarted='1'";


    $emptyArray = '["","","","","","","","",""]';
    $query = "UPDATE `AvailableRooms` SET $setPlayerName $setPlayerAvl, `WhoseTurn`='Player One', `TilesValue`='$emptyArray', $setIsStarted WHERE Name='$_SESSION[roomName]'";
    $conn->query($query);


    $query = "SELECT `P1Name`, `P2Name` FROM AvailableRooms WHERE `Name` = '$_SESSION[roomName]' ";
    $result = $conn->query($query);
    while ($resultRow = $result->fetch_assoc()){
        $p1Name = $resultRow['P1Name'];
        $p2Name = $resultRow['P2Name'];
    }
    $responseText = (empty($whoseRequest)) ? "Exits Room" : 
    (($whoseRequest == "Player One") ? "$p1Name left the Room" :
    (($whoseRequest == "Player Two") ? "`$p2Name left the Room" : ""));

    echo $responseText;

    (empty($whoseRequest)) ? session_destroy() : "";
?>