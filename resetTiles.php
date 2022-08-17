<?php
    session_start();
    include 'ConnectDB.php';
    $whoseTurn = $_REQUEST['whoseTurn'];
    $emptyArray = '["","","","","","","","",""]';
    $query = "UPDATE `AvailableRooms` SET `WhoseTurn`='$whoseTurn', `TilesValue`='$emptyArray' WHERE Name='$_SESSION[roomName]'";
    $conn->query($query);
    echo "Tiles Resets";
?>