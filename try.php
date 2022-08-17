<?php
    $p1Name = "dhee";
    $p2Name = "Dhee";
    //$whoseRequest = "Player One";
    $responseText = ($whoseRequest == "Player One") ?
                        (($p1Name == "jyo") ? "Exits the game" : "$p1Name left the Room") :
                    (($whoseRequest == "Player Two") ? 
                        (($p2Name == "jyo") ? "Exits the game" : "$p2Name left the Room") : 
                    ((empty($whoseRequest)) ? "Exit":""));

    echo $responseText;
?>