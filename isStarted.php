<?php
    session_start();
    //echo "isMyTurnPHP";

    include 'ConnectDB.php';

    $query = "SELECT `IsStarted` FROM AvailableRooms WHERE Name = '$_SESSION[roomName]'";
    $result = $conn->query($query);
    while($resultRow = $result->fetch_assoc()){
        echo $resultRow['IsStarted'];
    }
?>