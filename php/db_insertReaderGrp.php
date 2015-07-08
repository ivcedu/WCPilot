<?php
    require("config.php");
    
    $GrpName = filter_input(INPUT_POST, 'GrpName');
    $R1ID = filter_input(INPUT_POST, 'R1ID');
    $R2ID = filter_input(INPUT_POST, 'R2ID');
    $R3ID = filter_input(INPUT_POST, 'R3ID');
    
    $query = "INSERT INTO [IVCWCPILOT].[dbo].[ReaderGrp] (GrpName, R1ID, R2ID, R3ID) "
                ."VALUES ('$GrpName', '$R1ID', '$R2ID', '$R3ID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);