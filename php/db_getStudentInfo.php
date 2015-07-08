<?php
    require("config.php");
    
    $StuEmail = filter_input(INPUT_POST, 'StuEmail');

    $query = "SELECT StudentID FROM [IVCWCPILOT].[dbo].[Student] WHERE StuEmail = '" . $StuEmail . "'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data['StudentID']);