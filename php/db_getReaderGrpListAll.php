<?php
    require("config.php");

    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[ReaderGrp] WHERE GrpEnable = 1";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);