<?php
    require("config.php");

    $ReaderGrpID = filter_input(INPUT_POST, 'ReaderGrpID');
    
    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[ReaderGrp] "
            . "WHERE ReaderGrpID = '".$ReaderGrpID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);