<?php
    require("config.php");
    
    $WSampleID = filter_input(INPUT_POST, 'WSampleID');

    $query = "SELECT stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "stud.StuEmail AS StudentEmail, "
            . "wspl.DTEnd AS SubmissionDate, "
            . "wspl.Title, "
            . "wspl.Essay "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE wspl.WSampleID = '".$WSampleID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);