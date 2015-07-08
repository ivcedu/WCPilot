<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    
//    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
//    
//    $query1 = "CREATE TABLE #RESULT(WSampleID int, StudentID int, StudentName nvarchar(255), SubmissionDate datetime, R1Score int, R1ESL bit, R2Score int, R2ESL bit, R3Score int, R3ESL bit, AvgScore numeric(3, 2))";
//    
//    $query2 = "INSERT INTO #RESULT "
//            . "SELECT wspl.WSampleID, stud.StuID, stud.StuName, wspl.DTEnd, scre.R1Score, scre.R1ESL, scre.R2Score, scre.R2ESL, scre.R3Score, scre.R3ESL, "
//            . "CONVERT(numeric(3, 2), (ISNULL(CONVERT(numeric(3, 2), scre.R1Score), 0) + ISNULL(CONVERT(numeric(3, 2), scre.R2Score), 0) + ISNULL(CONVERT(numeric(3, 2), scre.R3Score), 0)) "
//            . "/ NULLIF((CASE WHEN scre.R1Score IS NULL THEN 0 ELSE 1 END + CASE WHEN scre.R2Score IS NULL THEN 0 ELSE 1 END + CASE WHEN scre.R3Score IS NULL THEN 0 ELSE 1 END), 0)) "
//            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
//            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
//            . "WHERE wspl.StatusID = '".$StatusID."'";
//    
//    $query3 = "SELECT WSampleID, StudentID, StudentName, SubmissionDate, R1Score, R1ESL, R2Score, R2ESL, R3Score, R3ESL, "
//            . "CASE WHEN AvgScore >= 4 THEN 'WR 1' "
//            . "WHEN AvgScore >= 3 AND AvgScore < 4 THEN 'WR 201' "
//            . "WHEN AvgScore >= 2 AND AvgScore < 3 THEN 'WR 301' "
//            . "WHEN AvgScore = 1 THEN 'RDG 370' "
//            . "ELSE 'Undefined' END AS Placement "
//            . "FROM #RESULT";
//    
//    $query4 = "DROP TABLE #RESULT";
//    
//    $dbConn->query($query1);
//    $dbConn->query($query2);
//
//    $cmd = $dbConn->prepare($query3);
//    $cmd->execute();
//    $data = $cmd->fetchAll();
//    
//    $dbConn->query($query4);
    
    $query = "SELECT wspl.WSampleID AS WSampleID, "
            . "stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "wspl.DTEnd AS SubmissionDate, "
            . "scre.R1Score AS R1Score, "
            . "scre.R1ESL AS R1ESL, "
            . "scre.R2Score AS R2Score, "
            . "scre.R2ESL AS R2ESL, "
            . "scre.R3Score AS R3Score, "
            . "scre.R3ESL AS R3ESL, "
            . "CASE WHEN scre.R3Score IS NOT NULL AND scre.R3Score >= 4 THEN 'WR 1' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 3 AND scre.R3ESL = 0 THEN 'WR 201' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 3 AND scre.R3ESL = 1 THEN 'ESL 201' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 2 AND scre.R3ESL = 0 THEN 'WR 301/WR 399' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 2 AND scre.R3ESL = 1 THEN 'ESL 301' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 1 AND scre.R3ESL = 0 THEN 'RDG 370' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 1 AND scre.R3ESL = 1 THEN 'Take the ESL writing assessment' "
            . "WHEN scre.R3Score IS NULL AND (scre.R1Score >= 4 OR scre.R2Score >= 4) THEN 'WR 1' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 3 AND scre.R1ESL = 0 AND scre.R2ESL = 0 THEN 'WR 201' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 3 AND (scre.R1ESL = 1 OR scre.R2ESL = 0) THEN 'ESL 201' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 2 AND scre.R1ESL = 0 AND scre.R2ESL = 0 THEN 'WR 301/WR 399' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 2 AND (scre.R1ESL = 1 OR scre.R2ESL = 0) THEN 'ESL 301' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 1 AND scre.R1ESL = 0 AND scre.R2ESL = 0 THEN 'RDG 370' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 1 AND (scre.R1ESL = 1 OR scre.R2ESL = 0) THEN 'Take the ESL writing assessment' "
            . "ELSE 'Undefined' END AS Placement "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE wspl.StatusID = '".$StatusID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();

    echo json_encode($data);