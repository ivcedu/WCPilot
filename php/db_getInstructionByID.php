<?php
    require("config.php");
    
    $InstructionID = filter_input(INPUT_POST, 'InstructionID');

    $query = "SELECT * FROM [IVCWCPILOT].[dbo].[Instruction] WHERE InstructionID = '".$InstructionID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);