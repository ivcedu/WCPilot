<?php
    require("config.php");
    
    $WSampleID = filter_input(INPUT_POST, 'WSampleID');
    $ColStatus = filter_input(INPUT_POST, 'ColStatus');
    $StatusValue = filter_input(INPUT_POST, 'StatusValue');
    $ColScore = filter_input(INPUT_POST, 'ColScore');
    $ScoreValue = filter_input(INPUT_POST, 'ScoreValue');
    $ColESL = filter_input(INPUT_POST, 'ColESL');
    $ESLValue = filter_input(INPUT_POST, 'ESLValue');
    $ColDateScore = filter_input(INPUT_POST, 'ColDateScore');

    $query = "UPDATE [IVCWCPILOT].[dbo].[Score] "
                ."SET ".$ColStatus." = '".$StatusValue."', ".$ColScore." = '".$ScoreValue."', ".$ColESL." = '".$ESLValue."', ".$ColDateScore." = getdate() "
                ."WHERE WSampleID = '".$WSampleID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);