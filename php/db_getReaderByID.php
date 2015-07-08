<?php
    require("config.php");
    
    $ReaderID = filter_input(INPUT_POST, 'ReaderID');

    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = '".$ReaderID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);