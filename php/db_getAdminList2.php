<?php
    require("config.php");

    $query = "SELECT AdminName, AdminEmail, "
            . "'<a href=# id=''edit_admin_id_' + CONVERT(NVARCHAR(255), AdminID) + '''><i class=''fa fa-edit''></i></a>' AS AdminEdit, "
            . "'<a href=# id=''delete_admin_id_' + CONVERT(NVARCHAR(255), AdminID) + '''><i class=''fa fa-trash-o''></i></a>' AS AdminDelete "
            . "FROM [IVCWCPILOT].[dbo].[Admin] ORDER BY AdminName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);