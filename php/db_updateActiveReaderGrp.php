<?php
    require("config.php");
    
    $ReaderGrpID = filter_input(INPUT_POST, 'ReaderGrpID');
    $Active = filter_input(INPUT_POST, 'Active');

    $query = "UPDATE [IVCWCPILOT].[dbo].[ReaderGrp] "
                ."SET Active = '".$Active."' "
                ."WHERE ReaderGrpID = '".$ReaderGrpID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);