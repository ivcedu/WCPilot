<?php
    require("config.php");

    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[Instruction]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);