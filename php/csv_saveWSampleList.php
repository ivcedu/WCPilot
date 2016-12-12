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

    $query = "SELECT wspl.WSampleID, "
            . "stud.StuID AS StudentID, "
            . "stud.StuName AS StudentName, "
            . "'<a href=# id=''wsample_id_' + CONVERT(NVARCHAR(255), wspl.WSampleID) + '''><i class=''fa fa-file''></i></a>' AS WSTitle, "
            . "wspl.Duration, "
            . "CONVERT(VARCHAR(10), wspl.DTEnd, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), wspl.DTEnd, 109), 15), 7, 7, ' ') AS SubmissionDate, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R1ID) AS R1Name, "
            . "scre.R1Score AS R1Score, "
            . "CASE WHEN scre.R1ESL = 1 THEN 'Yes' ELSE '' END AS R1ESL, "
            . "CONVERT(VARCHAR(10), scre.R1DateScore, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), scre.R1DateScore, 109), 15), 7, 7, ' ') AS R1DateScore, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R2ID) AS R2Name, "
            . "scre.R2Score AS R2Score, "
            . "CASE WHEN scre.R2ESL = 1 THEN 'Yes' ELSE '' END AS R2ESL, "
            . "CONVERT(VARCHAR(10), scre.R2DateScore, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), scre.R2DateScore, 109), 15), 7, 7, ' ') AS R2DateScore, "
            . "(SELECT ReaderName FROM [IVCWCPILOT].[dbo].[Reader] WHERE ReaderID = scre.R3ID) AS R3Name, "
            . "scre.R3Score AS R3Score, "
            . "CASE WHEN scre.R3ESL = 1 THEN 'Yes' ELSE '' END AS R3ESL, "
            . "CONVERT(VARCHAR(10), scre.R3DateScore, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), scre.R3DateScore, 109), 15), 7, 7, ' ') AS R3DateScore "
            . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
            . "LEFT JOIN [IVCWCPILOT].[dbo].[Student] AS stud ON wspl.StudentID = stud.StudentID "
            . "WHERE wspl.StatusID = '".$StatusID."'".$str_search_reader;

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    $filename = "completed_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
    fputcsv($out, array('ID','StudentID','Student Name','Duration','Submitted','R1','R1 Score','R1 ESL','R1 Date','R2','R2 Score','R2 ESL','R2 Date','R3','R3 Score','R3 ESL','R3 Date',));
    // Write all the user records to the spreadsheet
    foreach($data as $row) {
        fputcsv($out, array($row['WSampleID'], $row['StudentID'], $row['StudentName'], $row['Duration'], $row['SubmissionDate'], 
                $row['R1Name'], $row['R1Score'], $row['R1ESL'], $row['R1DateScore'], 
                $row['R2Name'], $row['R2Score'], $row['R2ESL'], $row['R2DateScore'], 
                $row['R3Name'], $row['R3Score'], $row['R3ESL'], $row['R3DateScore']));
    }
    
    fclose($out);
    exit;