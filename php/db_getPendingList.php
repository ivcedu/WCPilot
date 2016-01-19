<?php
    require("config.php");

    $query = "SELECT wspl.WSampleID, "
            . "stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "'<a href=# id=''wsample_id_' + CONVERT(NVARCHAR(255), wspl.WSampleID) + '''><i class=''fa fa-file''></i></a>' AS WSTitle, "
            . "wspl.Duration, "
            . "CONVERT(VARCHAR(10), wspl.DTEnd, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), wspl.DTEnd, 109), 15), 7, 7, ' ') AS SubmissionDate, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R1ID) AS R1Name, "
            . "CASE WHEN scre.R1Score IS NULL THEN 'Waiting' ELSE CONVERT(VARCHAR(1), scre.R1Score) END AS R1Score, "
            . "CASE WHEN scre.R1ESL = 1 THEN 'Yes' ELSE '' END AS R1ESL, "
            . "CONVERT(VARCHAR(10), scre.R1DateScore, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), scre.R1DateScore, 109), 15), 7, 7, ' ') AS R1DateScore, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R2ID) AS R2Name, "
            . "CASE WHEN scre.R2Score IS NULL THEN 'Waiting' ELSE CONVERT(VARCHAR(1), scre.R2Score) END AS R2Score, "
            . "CASE WHEN scre.R2ESL = 1 THEN 'Yes' ELSE '' END AS R2ESL, "
            . "CONVERT(VARCHAR(10), scre.R2DateScore, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), scre.R2DateScore, 109), 15), 7, 7, ' ') AS R2DateScore, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R3ID) AS R3Name, "
            . "CASE WHEN scre.R3StatusID = 1 AND scre.R3Score IS NULL THEN 'Waiting' ELSE CONVERT(VARCHAR(1), scre.R3Score) END AS R3Score, "
            . "CASE WHEN scre.R3ESL = 1 THEN 'Yes' ELSE '' END AS R3ESL, "
            . "CONVERT(VARCHAR(10), scre.R3DateScore, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), scre.R3DateScore, 109), 15), 7, 7, ' ') AS R3DateScore "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE wspl.StatusID = '1'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);