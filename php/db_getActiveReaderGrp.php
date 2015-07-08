<?php
    require("config.php");
    
    $query = "SELECT *, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = R1ID) AS R1Name, "
            . "(SELECT ReaderEmail FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = R1ID) AS R1Email, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = R2ID) AS R2Name, "
            . "(SELECT ReaderEmail FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = R2ID) AS R2Email "
            . "FROM [IVCWCPILOT].[dbo].[ReaderGrp] "
            . "WHERE Active = 1";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);