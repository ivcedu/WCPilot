<?php
    require("config.php");
    
    $ReaderGrpID = filter_input(INPUT_POST, 'ReaderGrpID');
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query1 = "UPDATE [IVCWCPILOT].[dbo].[ReaderGrp] SET Active = 0";

    $query2 = "UPDATE [IVCWCPILOT].[dbo].[ReaderGrp] "
                ."SET Active = 1 "
                ."WHERE ReaderGrpID = '".$ReaderGrpID."'";
    
    $dbConn->query($query1);
    
    $cmd = $dbConn->prepare($query2);
    $result = $cmd->execute(); 

    echo json_encode($result);