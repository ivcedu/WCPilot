<?php
    require("config.php");

    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[Reader]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);