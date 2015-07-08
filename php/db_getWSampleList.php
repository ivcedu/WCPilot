<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');

    $query = "SELECT wspl.WSampleID, "
            . "(SELECT [Status] FROM [IVCWCPILOT].[dbo].[Status] WHERE StatusID = wspl.StatusID) AS WSampleStatus, "
            . "stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "wspl.Title, "
            . "wspl.Duration, "
            . "wspl.DTEnd AS SubmissionDate, "
            . "scre.R1ID, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R1ID) AS R1Name, "
            . "scre.R1StatusID AS R1Status, "
            . "scre.R1Score AS R1Score, "
            . "scre.R1ESL AS R1ESL, "
            . "scre.R1DateScore AS R1DateScore, "
            . "scre.R2ID, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R2ID) AS R2Name, "
            . "scre.R2StatusID AS R2Status, "
            . "scre.R2Score AS R2Score, "
            . "scre.R2ESL AS R2ESL, "
            . "scre.R2DateScore AS R2DateScore, "
            . "scre.R3ID, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R3ID) AS R3Name, "
            . "scre.R3StatusID AS R3Status, "
            . "scre.R3Score AS R3Score, "
            . "scre.R3ESL AS R3ESL, "
            . "scre.R3DateScore AS R3DateScore "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE wspl.StatusID = '".$StatusID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);