<?php
    require("config.php");
    
    $ReaderID = filter_input(INPUT_POST, 'ReaderID');

    $query = "SELECT wspl.WSampleID, "
            . "stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "'<a href=# id=''wsample_id_' + CONVERT(NVARCHAR(255), wspl.WSampleID) + '''><i class=''fa fa-file''></i></a>' AS WSTitle, "
            . "wspl.Duration, "
            . "CONVERT(VARCHAR(10), wspl.DTEnd, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), wspl.DTEnd, 109), 15), 7, 7, ' ') AS SubmissionDate "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE (scre.R1StatusID = '1' AND scre.R1ID = '".$ReaderID."') OR (scre.R2StatusID = '1' AND scre.R2ID = '".$ReaderID."') OR (scre.R3StatusID = '1' AND scre.R3ID = '".$ReaderID."')";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);