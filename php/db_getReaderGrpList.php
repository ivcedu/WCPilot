<?php
    require("config.php");

    $query = "SELECT *,"
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = R1ID) AS R1Name, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = R2ID) AS R2Name, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = R3ID) AS R3Name "
            . "FROM [IVCWCPILOT].[dbo].[ReaderGrp] "
            . "ORDER BY ReaderGrpID ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);