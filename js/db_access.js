// get AD login info ///////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// get DB //////////////////////////////////////////////////////////////////////
function db_getStudentInfo(StuEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getStudentInfo.php",
        data:{StuEmail:StuEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminByEmail(AdminEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByEmail.php",
        data:{AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReaderList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReaderList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReaderListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReaderListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReaderGrpList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReaderGrpList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReaderGrpListEnable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReaderGrpListEnable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReaderByID(ReaderID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReaderByID.php",
        data:{ReaderID:ReaderID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getReaderByEmail(ReaderEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getReaderByEmail.php",
        data:{ReaderEmail:ReaderEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSelectedReader(ReaderID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSelectedReader.php",
        data:{ReaderID:ReaderID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSelectedReaderGrp(ReaderGrpID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSelectedReaderGrp.php",
        data:{ReaderGrpID:ReaderGrpID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSelectedAdmin(AdminID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSelectedAdmin.php",
        data:{AdminID:AdminID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getWSample(WSampleID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getWSample.php",
        data:{WSampleID:WSampleID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getWSampleList(StatusID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getWSampleList.php",
        data:{StatusID:StatusID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getPlacementList(StatusID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getPlacementList.php",
        data:{StatusID:StatusID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getWSWaitingListByLoginID(ReaderID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getWSWaitingListByLoginID.php",
        data:{ReaderID:ReaderID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSelectedScore(WSampleID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSelectedScore.php",
        data:{WSampleID:WSampleID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActiveReaderGrp() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getActiveReaderGrp.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getInstructionByID(InstructionID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getInstructionByID.php",
        data:{InstructionID:InstructionID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getInstructionByTitle(Title) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getInstructionByTitle.php",
        data:{Title:Title},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getInstructionList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getInstructionList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getDashboardList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getDashboardList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////
function db_insertStudentInfo(StuID, StuName, StuEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStudentInfo.php",
        data:{StuID:StuID, StuName:StuName, StuEmail:StuEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertReader(Active, ReaderName, ReaderEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertReader.php",
        data:{Active:Active, ReaderName:ReaderName, ReaderEmail:ReaderEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertReaderGrp(GrpEnable, GrpName, R1ID, R2ID, R3ID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertReaderGrp.php",
        data:{GrpEnable:GrpEnable, GrpName:GrpName, R1ID:R1ID, R2ID:R2ID, R3ID:R3ID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertAdmin(AdminName, AdminEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAdmin.php",
        data:{AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertWSample(StudentID, DTStart, DTEnd, Duration, InstructionID, Title, Essay) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertWSample.php",
        data:{StudentID:StudentID, DTStart:DTStart, DTEnd:DTEnd, Duration:Duration, InstructionID:InstructionID, Title:Title, Essay:Essay},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertScore(WSampleID, R1ID, R1StatusID, R2ID, R2StatusID, R3ID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertScore.php",
        data:{WSampleID:WSampleID, R1ID:R1ID, R1StatusID:R1StatusID, R2ID:R2ID, R2StatusID:R2StatusID, R3ID:R3ID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertInstruction(Title, Instruction) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertInstruction.php",
        data:{Title:Title, Instruction:Instruction},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////
function db_updateReader(ReaderID, Active, ReaderName, ReaderEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateReader.php",
        data:{ReaderID:ReaderID, Active:Active, ReaderName:ReaderName, ReaderEmail:ReaderEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateReaderGrp(ReaderGrpID, GrpEnable, GrpName, R1ID, R2ID, R3ID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateReaderGrp.php",
        data:{ReaderGrpID:ReaderGrpID, GrpEnable:GrpEnable, GrpName:GrpName, R1ID:R1ID, R2ID:R2ID, R3ID:R3ID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateActiveReaderGrp(ReaderGrpID, Active) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateActiveReaderGrp.php",
        data:{ReaderGrpID:ReaderGrpID, Active:Active},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateAdmin(AdminID, AdminName, AdminEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAdmin.php",
        data:{AdminID:AdminID, AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateScore(WSampleID, ColStatus, StatusValue, ColScore, ScoreValue, ColESL, ESLValue, ColDateScore) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateScore.php",
        data:{WSampleID:WSampleID, ColStatus:ColStatus, StatusValue:StatusValue, ColScore:ColScore, ScoreValue:ScoreValue, ColESL:ColESL, ESLValue:ESLValue, ColDateScore:ColDateScore},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateScoreThirdReader(WSampleID, R3StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateScoreThirdReader.php",
        data:{WSampleID:WSampleID, R3StatusID:R3StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateWSampleStatus(WSampleID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateWSampleStatus.php",
        data:{WSampleID:WSampleID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateInstruction(InstructionID, Title, Instruction) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateInstruction.php",
        data:{InstructionID:InstructionID, Title:Title, Instruction:Instruction},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////
function db_deleteAdmin(AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteAdmin.php",
        data:{AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}