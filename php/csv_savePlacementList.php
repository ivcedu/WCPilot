<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_GET, 'StatusID');
    $SearchOption = filter_input(INPUT_GET, 'SearchOption');
    $StartDate = filter_input(INPUT_GET, 'StartDate');
    $EndDate = filter_input(INPUT_GET, 'EndDate');
    
    $str_search_reader = "";
    if ($SearchOption !== "All") {
        $str_search_reader = " AND wspl.DTStart BETWEEN '".$StartDate."' AND '".$EndDate."'";
    }
    
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
            . "WHERE wspl.StatusID = '".$StatusID."'".$str_search_reader;
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();

    $filename = "placements_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
    fputcsv($out, array('ID','StudentID','Student Name','Submitted','R1 Score','R1 ESL','R2 Score','R2 ESL','R3 Score','R3 ESL','Placement'));
    // Write all the user records to the spreadsheet
    foreach($data as $row) {
        fputcsv($out, array($row['WSampleID'], $row['StudentID'], $row['StudentName'], $row['SubmissionDate'], 
                $row['R1Score'], $row['R1ESL'], $row['R2Score'], $row['R2ESL'], $row['R3Score'], $row['R3ESL'], $row['Placement']));
    }
    
    fclose($out);
    exit;