<?php
    require("config.php");
    
    $WSampleID = filter_input(INPUT_POST, 'WSampleID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');

    $query = "UPDATE [IVCWCPILOT].[dbo].[WSample] "
                ."SET StatusID = '".$StatusID."'"
                ."WHERE WSampleID = '".$WSampleID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);