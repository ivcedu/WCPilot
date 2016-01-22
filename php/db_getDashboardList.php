<?php
    require("config.php");
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query_create_table = "CREATE TABLE #RESULT(InstructionID int, Instruction nvarchar(255), TotalRecords int, Duration int, FinalScore DECIMAL(3,2))";
    
    $query_insert = "INSERT INTO #RESULT SELECT inst.InstructionID, inst.Title, COUNT(*) OVER(), wspl.Duration, "
                    . "CONVERT(DECIMAL(3,2), CASE WHEN scre.R3Score IS NULL THEN (scre.R1Score + scre.R2Score)/2 ELSE scre.R3Score END) AS FinalScore "
                    . "FROM [IVCWCPILOT].[dbo].[WSample] AS wspl LEFT JOIN [IVCWCPILOT].[dbo].[Score] AS scre ON wspl.WSampleID = scre.WSampleID "
                    . "LEFT JOIN [IVCWCPILOT].[dbo].[Instruction] AS inst ON wspl.InstructionID = inst.InstructionID "
                    . "WHERE wspl.StatusID = 3";
    
    $query_get_result = "SELECT InstructionID, Instruction, TotalRecords, COUNT(Instruction) AS InstructonCount, AVG(Duration) AS AvgDuration, CONVERT(DECIMAL(3,2), AVG(FinalScore)) AS AvgScore "
                        . "FROM #RESULT GROUP BY InstructionID, Instruction, TotalRecords";
    
    $query_drop_table = "DROP TABLE #RESULT";
    
    // create table
    $dbConn->query($query_create_table);
    // insert to table
    $dbConn->query($query_insert);
    // get result            
    $cmd = $dbConn->prepare($query_get_result);
    $cmd->execute();
    $data = $cmd->fetchAll();
    // drop table
    $dbConn->query($query_drop_table);
    
    echo json_encode($data);