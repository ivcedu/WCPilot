<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $ReaderName = filter_input(INPUT_POST, 'ReaderName');
    $ReaderEmail = filter_input(INPUT_POST, 'ReaderEmail');
    
    $query = "INSERT INTO [IVCWCPILOT].[dbo].[Reader] (Active, ReaderName, ReaderEmail) "
                ."VALUES ('$Active', '$ReaderName', '$ReaderEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);