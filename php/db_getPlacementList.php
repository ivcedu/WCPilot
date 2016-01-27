<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    
    $query = "SELECT wspl.WSampleID AS WSampleID, "
            . "stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "CONVERT(VARCHAR(10), wspl.DTEnd, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), wspl.DTEnd, 109), 15), 7, 7, ' ') AS SubmissionDate, "
            . "scre.R1Score AS R1Score, "
            . "CASE WHEN scre.R1ESL = 1 THEN 'Yes' ELSE '' END AS R1ESL, "
            . "scre.R2Score AS R2Score, "
            . "CASE WHEN scre.R2ESL = 1 THEN 'Yes' ELSE '' END AS R2ESL, "
            . "scre.R3Score AS R3Score, "
            . "CASE WHEN scre.R3ESL = 1 THEN 'Yes' ELSE '' END AS R3ESL, "
            . "CASE WHEN scre.R3Score IS NOT NULL AND scre.R3Score >= 4 AND scre.R3ESL = 0 AND scre.R2ESL = 0 AND scre.R1ESL = 0 THEN 'WR 1' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score >= 4 AND (scre.R3ESL = 1 OR scre.R2ESL = 1 OR scre.R1ESL = 1) THEN 'ESL 201' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 3 AND scre.R3ESL = 0 AND scre.R2ESL = 0 AND scre.R1ESL = 0 THEN 'WR 201' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 3 AND (scre.R3ESL = 1 OR scre.R2ESL = 1 OR scre.R1ESL = 1) THEN 'ESL 201' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 2 AND scre.R3ESL = 0 AND scre.R2ESL = 0 AND scre.R1ESL = 0 THEN 'WR 301/WR 399' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 2 AND (scre.R3ESL = 1 OR scre.R2ESL = 1 OR scre.R1ESL = 1) THEN 'ESL 301' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 1 AND scre.R3ESL = 0 AND scre.R2ESL = 0 AND scre.R1ESL = 0 THEN 'RDG 370' "
            . "WHEN scre.R3Score IS NOT NULL AND scre.R3Score = 1 AND (scre.R3ESL = 1 OR scre.R2ESL = 1 OR scre.R1ESL = 1) THEN 'Take the ESL writing assessment' "
            . "WHEN scre.R3Score IS NULL AND (scre.R1Score >= 4 OR scre.R2Score >= 4) AND scre.R1ESL = 0 AND scre.R2ESL = 0 THEN 'WR 1' "
            . "WHEN scre.R3Score IS NULL AND (scre.R1Score >= 4 OR scre.R2Score >= 4) AND (scre.R1ESL = 1 OR scre.R2ESL = 1) THEN 'ESL 201' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 3 AND scre.R1ESL = 0 AND scre.R2ESL = 0 THEN 'WR 201' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 3 AND (scre.R1ESL = 1 OR scre.R2ESL = 1) THEN 'ESL 201' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 2 AND scre.R1ESL = 0 AND scre.R2ESL = 0 THEN 'WR 301/WR 399' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 2 AND (scre.R1ESL = 1 OR scre.R2ESL = 1) THEN 'ESL 301' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 1 AND scre.R1ESL = 0 AND scre.R2ESL = 0 THEN 'RDG 370' "
            . "WHEN scre.R3Score IS NULL AND scre.R1Score = 1 AND (scre.R1ESL = 1 OR scre.R2ESL = 1) THEN 'Take the ESL writing assessment' "
            . "ELSE 'Undefined' END AS Placement "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE wspl.StatusID = '".$StatusID."'";
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();

    echo json_encode($data);