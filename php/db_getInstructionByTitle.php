<?php
    require("config.php");
    
    $Title = filter_input(INPUT_POST, 'Title');

    $query = "SELECT Instruction FROM [IVCWCPILOT].[dbo].[Instruction] WHERE Title = '".$Title."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data['Instruction']);