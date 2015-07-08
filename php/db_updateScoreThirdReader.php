<?php
    require("config.php");
    
    $WSampleID = filter_input(INPUT_POST, 'WSampleID');
    $R3StatusID = filter_input(INPUT_POST, 'R3StatusID');

    $query = "UPDATE [IVCWCPILOT].[dbo].[Score] "
                ."SET R3StatusID = '".$R3StatusID."'"
                ."WHERE WSampleID = '".$WSampleID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);