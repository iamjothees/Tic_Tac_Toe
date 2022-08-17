<?php
    session_start();

    include "ConnectDB.php";

    $JSONTilesValue = $_REQUEST['JSONTilesValue'];

    $query = "UPDATE `AvailableRooms` SET `TilesValue`='$JSONTilesValue', `IsStarted`='1' WHERE `Name`='$_SESSION[roomName]'";
    $conn->query($query);
?>