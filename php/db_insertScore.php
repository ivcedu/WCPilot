<?php
    require("config.php");
    
    $WSampleID = filter_input(INPUT_POST, 'WSampleID');
    $R1ID = filter_input(INPUT_POST, 'R1ID');
    $R1StatusID = filter_input(INPUT_POST, 'R1StatusID');
    $R2ID = filter_input(INPUT_POST, 'R2ID');
    $R2StatusID = filter_input(INPUT_POST, 'R2StatusID');
    $R3ID = filter_input(INPUT_POST, 'R3ID');
    
    $query = "INSERT INTO [IVCWCPILOT].[dbo].[Score] (WSampleID, R1ID, R1StatusID, R2ID, R2StatusID, R3ID) "
                ."VALUES ('$WSampleID', '$R1ID', '$R1StatusID', '$R2ID', '$R2StatusID', '$R3ID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);