<?php
    require("config.php");
    
    $AdminName = filter_input(INPUT_POST, 'AdminName');
    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');
    
    $AdminName = str_replace("'", "''", $AdminName);
    $AdminEmail = str_replace("'", "", $AdminEmail);
    
    $query = "INSERT INTO [IVCWCPILOT].[dbo].[Admin] (AdminName, AdminEmail) "
                ."VALUES ('$AdminName', '$AdminEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);