<?php
    require("config.php");
    
    $SearchOption = filter_input(INPUT_POST, 'SearchOption');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $str_search_reader1 = "";
    $str_search_reader2 = "";
    $str_search_reader3 = "";
    if ($SearchOption !== "All") {
        $str_search_reader1 = "AND scor.R1DateScore BETWEEN '".$StartDate."' AND '".$EndDate."' ";
        $str_search_reader2 = "AND scor.R2DateScore BETWEEN '".$StartDate."' AND '".$EndDate."' ";
        $str_search_reader3 = "AND scor.R3DateScore BETWEEN '".$StartDate."' AND '".$EndDate."' ";
    }
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query_create_table = "CREATE TABLE #RESULT(ReaderName nvarchar(255), EssayCount INT, AvgScore DECIMAL(10,2))";
    
    $query_insert_reader1 = "INSERT INTO #RESULT SELECT radr.ReaderName, COUNT(radr.ReaderName), CAST(AVG(CAST(scor.R1Score as DECIMAL(10,2))) AS DECIMAL(10,2)) "
                            . "FROM [IVCWCPILOT].[dbo].[Score] AS scor LEFT JOIN [IVCWCPILOT].[dbo].[Reader] AS radr ON scor.R1ID = radr.ReaderID "
                            . "WHERE scor.R1StatusID = 3 " . $str_search_reader1
                            . "GROUP BY radr.ReaderName";
    
    $query_insert_reader2 = "INSERT INTO #RESULT SELECT radr.ReaderName, COUNT(radr.ReaderName), CAST(AVG(CAST(scor.R2Score as DECIMAL(10,2))) AS DECIMAL(10,2)) "
                            . "FROM [IVCWCPILOT].[dbo].[Score] AS scor LEFT JOIN [IVCWCPILOT].[dbo].[Reader] AS radr ON scor.R2ID = radr.ReaderID "
                            . "WHERE scor.R2StatusID = 3 " . $str_search_reader2
                            . "GROUP BY radr.ReaderName";
    
    $query_insert_reader3 = "INSERT INTO #RESULT SELECT radr.ReaderName, COUNT(radr.ReaderName), CAST(AVG(CAST(scor.R3Score as DECIMAL(10,2))) AS DECIMAL(10,2)) "
                            . "FROM [IVCWCPILOT].[dbo].[Score] AS scor LEFT JOIN [IVCWCPILOT].[dbo].[Reader] AS radr ON scor.R3ID = radr.ReaderID "
                            . "WHERE scor.R3StatusID = 3 " . $str_search_reader3
                            . "GROUP BY radr.ReaderName";
    
    $query_get_result = "SELECT ReaderName, SUM(EssayCount) AS EssayCount, CAST(AVG(AvgScore) AS DECIMAL(10,2)) AS AvgScore "
                        . "FROM #RESULT GROUP BY ReaderName";
    
    $query_drop_table = "DROP TABLE #RESULT";
    
    // create table
    $dbConn->query($query_create_table);
    // insert to table
    $dbConn->query($query_insert_reader1);
    $dbConn->query($query_insert_reader2);
    $dbConn->query($query_insert_reader3);
    // get result            
    $cmd = $dbConn->prepare($query_get_result);
    $cmd->execute();
    $data = $cmd->fetchAll();
    // drop table
    $dbConn->query($query_drop_table);
    
    echo json_encode($data);