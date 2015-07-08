<?php
    require("config.php");
    
    $InstructionID = filter_input(INPUT_POST, 'InstructionID');
    $Title = filter_input(INPUT_POST, 'Title');
    $Instruction = filter_input(INPUT_POST, 'Instruction');

    $query = "UPDATE [IVCWCPILOT].[dbo].[Instruction] "
                ."SET Title = '".$Title."', Instruction = '".$Instruction."' "
                ."WHERE InstructionID = '".$InstructionID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);