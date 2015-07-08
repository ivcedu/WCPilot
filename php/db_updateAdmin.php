<?php
    require("config.php");
    
    $ReaderID = filter_input(INPUT_POST, 'AdminID');
    $AdminName = filter_input(INPUT_POST, 'AdminName');
    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');

    $query = "UPDATE [IVCWCPILOT].[dbo].[Admin] "
                ."SET AdminName = '".$AdminName."', AdminEmail = '".$AdminEmail."' "
                ."WHERE AdminID = '".$ReaderID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);