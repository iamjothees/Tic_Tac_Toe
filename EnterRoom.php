<?php
    session_start();

    include 'ConnectDB.php';

    $_SESSION['roomName'] = $_REQUEST['roomName'];
    $_SESSION['myName'] = $_REQUEST['myName'];
    
    $query = "SELECT `PlayerOne`, `isStarted` FROM `AvailableRooms` WHERE `Name`='$_SESSION[roomName]'";

    $result = $conn->query($query);
    while ($resultRow = $result->fetch_assoc()){
        $isPlayerOneFilled = $resultRow['PlayerOne'];
        $isStarted = $resultRow['IsStarted'];
    }

    //ADD PLAYER BASED ON IS STARTED

    if ($isPlayerOneFilled == 0){
        //$whoAmI = "Player One";
        $_SESSION['whoAmI'] = "Player One";
        $query = "UPDATE `AvailableRooms` SET `PlayerOne`='1', `P1Name`='$_SESSION[myName]' WHERE `Name`='$_SESSION[roomName]'";
        $conn->query($query);

    }else if ($isPlayerOneFilled == 1){
        //$whoAmI = "Player Two";
        $_SESSION['whoAmI'] = "Player Two";
        $query = "UPDATE `AvailableRooms` SET `PlayerTwo`='1', `P2Name`='$_SESSION[myName]', `isStarted`='1' WHERE `Name`='$_SESSION[roomName]'";
        $conn->query($query);
    }

    echo $_SESSION['whoAmI'];
?>