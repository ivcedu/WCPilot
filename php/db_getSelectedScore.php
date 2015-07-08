<?php
    require("config.php");

    $WSampleID = filter_input(INPUT_POST, 'WSampleID');
    
    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[Score] "
            . "WHERE WSampleID = '".$WSampleID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);