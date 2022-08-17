<?php
    session_start();
    include 'ConnectDB.php';
    $emptyArray = '["","","","","","","","",""]';

    $query = "SELECT `PlayerOne`, `PlayerTwo` FROM `AvailableRooms` WHERE `Name`='$_SESSION[roomName]'";

    $result = $conn->query($query);
    while ($resultRow = $result->fetch_assoc()){
        $isPlayerOneAvl = $resultRow['PlayerOne'];
        $isPlayerTwoAvl = $resultRow['PlayerTwo'];
    }

    if ($isPlayerOneAvl == "0" && $isPlayerTwoAvl == "0")
        $isRoomOpen = "0";
    else
    $isRoomOpen = "1";

    $query = "UPDATE `AvailableRooms` SET `P1Name`='Player One', `P2Name`='Player Two', `PlayerOne`='0',`PlayerTwo`='0', `WhoseTurn`='Player One', `TilesValue`='$emptyArray', `IsStarted`='$isRoomOpen' WHERE Name='$_SESSION[roomName]'";
    $conn->query($query);
    echo "Room Resets";
    session_destroy();
?>