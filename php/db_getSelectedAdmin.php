<?php
    require("config.php");

    $AdminID = filter_input(INPUT_POST, 'AdminID');
    
    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[Admin] "
            . "WHERE AdminID = '".$AdminID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);