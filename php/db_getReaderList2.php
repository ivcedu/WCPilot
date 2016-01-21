<?php
    require("config.php");

    $query = "SELECT ReaderName, ReaderEmail, "
            . "CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''edit_reader_id_' + CONVERT(NVARCHAR(255), ReaderID) + '''><i class=''fa fa-edit''></i></a>' AS ReaderEdit "
            . "FROM [IVCWCPILOT].[dbo].[Reader] ORDER BY ReaderName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);