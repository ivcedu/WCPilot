<?php
    require("config.php");
    
    $ReaderGrpID = filter_input(INPUT_POST, 'ReaderGrpID');
    $GrpName = filter_input(INPUT_POST, 'GrpName');
    $R1ID = filter_input(INPUT_POST, 'R1ID');
    $R2ID = filter_input(INPUT_POST, 'R2ID');
    $R3ID = filter_input(INPUT_POST, 'R3ID');

    $query = "UPDATE [IVCWCPILOT].[dbo].[ReaderGrp] "
                ."SET GrpName = '".$GrpName."', R1ID = '".$R1ID."', R2ID = '".$R2ID."', R3ID = '".$R3ID."' "
                ."WHERE ReaderGrpID = '".$ReaderGrpID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);