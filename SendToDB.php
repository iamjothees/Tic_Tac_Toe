<?php

    

    include 'connectDB.php';

    $query = `SELECT PlayerOne FROM AvailableRooms WHERE Name=$roomName`;

    $isPlayerOneFilled = 0;
    $result = $GLOBALS['conn']->query($query);
    while ($resultRow = $result->fetch_assoc()){
        $isPlayerOneFilled = $resultRow['PlayerOne'];
    }

    if ($isPlayerOneFilled === 0){
        $whoAmI = "Player One";
        $query = `UPDATE 'AvailableRooms' SET 'PlayerOne'='1' WHERE Name=$roomName`;
        $conn->query($query);
    }else{
        $whoAmI = "Player Two";
        $query = `UPDATE 'AvailableRooms' SET 'PlayerTwo'='1' WHERE Name=$roomName`;
        $conn->query($query);
    }
?>