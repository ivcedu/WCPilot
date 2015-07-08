<?php
    require("config.php");
    
    $StudentID = filter_input(INPUT_POST, 'StudentID');
    $DTStart = filter_input(INPUT_POST, 'DTStart');
    $DTEnd = filter_input(INPUT_POST, 'DTEnd');
    $Duration = filter_input(INPUT_POST, 'Duration');
    $InstructionID = filter_input(INPUT_POST, 'InstructionID');
    $Title = filter_input(INPUT_POST, 'Title');
    $Essay = filter_input(INPUT_POST, 'Essay');
    
    $query = "INSERT INTO [IVCWCPILOT].[dbo].[WSample] (StudentID, DTStart, DTEnd, Duration, InstructionID, Title, Essay) "
                ."VALUES ('$StudentID', '$DTStart', '$DTEnd', '$Duration', '$InstructionID', '$Title', '$Essay')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);