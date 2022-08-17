<?php
    session_start();
    //echo "isMyTurnPHP";

    include 'ConnectDB.php';

    
    ($_REQUEST['player'] == "Player One")?$player="Player Two" : $player="Player One";

    $query = "UPDATE AvailableRooms SET WhoseTurn = '$player' WHERE Name = '$_SESSION[roomName]'";
    $conn->query($query);
    echo $player;
?>