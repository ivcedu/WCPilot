<?php
    require("config.php");
    
    $ReaderID = filter_input(INPUT_POST, 'ReaderID');
    $Active = filter_input(INPUT_POST, 'Active');
    $ReaderName = filter_input(INPUT_POST, 'ReaderName');
    $ReaderEmail = filter_input(INPUT_POST, 'ReaderEmail');

    $query = "UPDATE [IVCWCPILOT].[dbo].[Reader] "
                ."SET Active = '".$Active."', ReaderName = '".$ReaderName."', ReaderEmail = '".$ReaderEmail."' "
                ."WHERE ReaderID = '".$ReaderID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);