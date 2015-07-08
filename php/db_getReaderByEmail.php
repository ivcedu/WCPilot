<?php
    require("config.php");
    
    $ReaderEmail = filter_input(INPUT_POST, 'ReaderEmail');

    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderEmail = '".$ReaderEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);