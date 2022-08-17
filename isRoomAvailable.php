<?php
    //session_start();
    //echo "isMyTurnPHP";

    include 'ConnectDB.php';
    /* $roomsie[0] = "0";
    $roomsie[1] = "0";
    $roomsie[2] = "1";
    $roomsie[3] = "0"; */
    $query = "SELECT `PlayerTwo` FROM `AvailableRooms`";
    $result = $conn->query($query);
    $i = 0;
    while($resultRow = $result->fetch_assoc()){
        $rooms[$i] = "$resultRow[PlayerTwo]";
        $i++;
    }
    echo json_encode($rooms);
?>