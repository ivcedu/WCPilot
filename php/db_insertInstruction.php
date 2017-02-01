<?php
    require("config.php");
    
    $Title = filter_input(INPUT_POST, 'Title');
    $Instruction = filter_input(INPUT_POST, 'Instruction');
    
    $Title = str_replace("'", "''", $Title);
    $Instruction = str_replace("'", "''", $Instruction);
    
    $query = "INSERT INTO [IVCWCPILOT].[dbo].[Instruction] (Title, Instruction) "
                ."VALUES ('$Title', '$Instruction')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);