<?php
    session_start();
    //echo "isMyTurnPHP";

    include 'ConnectDB.php';

    $query = "SELECT `P1Name`, `P2Name`, `PlayerOne`, `PlayerTwo`, `IsStarted`, `TilesValue`  FROM `AvailableRooms` WHERE `Name` = '$_SESSION[roomName]'";
    $result = $conn->query($query);
    while($resultRow = $result->fetch_assoc()){
        $outArr['p1Name'] = $resultRow['P1Name'];
        $outArr['p2Name'] = $resultRow['P2Name'];
        $outArr['playerOne'] = $resultRow['PlayerOne'];
        $outArr['playerTwo'] = $resultRow['PlayerTwo'];
        $outArr['isStarted'] = $resultRow['IsStarted'];
        $outArr['tilesValue'] = $resultRow['TilesValue'];

    }
    //echo $query;
    echo json_encode($outArr);

?>