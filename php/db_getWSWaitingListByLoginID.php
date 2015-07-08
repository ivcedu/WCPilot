<?php
    require("config.php");
    
    $ReaderID = filter_input(INPUT_POST, 'ReaderID');

    $query = "SELECT wspl.WSampleID, "
            . "(SELECT [Status] FROM [IVCWCPILOT].[dbo].[Status] WHERE StatusID = wspl.StatusID) AS WSampleStatus, "
            . "stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "wspl.Title, "
            . "wspl.Duration, "
            . "wspl.DTEnd AS SubmissionDate "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE (scre.R1StatusID = '1' AND scre.R1ID = '".$ReaderID."') OR (scre.R2StatusID = '1' AND scre.R2ID = '".$ReaderID."') OR (scre.R3StatusID = '1' AND scre.R3ID = '".$ReaderID."')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);