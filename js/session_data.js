////////////////////////////////////////////////////////////////////////////////
function sessionData_login(LoginID, LoginName, loginEmail, loginType) {  
    sessionStorage.setItem('ss_wcpilot_loginID', objToString(LoginID));
    sessionStorage.setItem('ss_wcpilot_loginName', objToString(LoginName));
    sessionStorage.setItem('ss_wcpilot_loginEmail', objToString(loginEmail));
    sessionStorage.setItem('ss_wcpilot_loginType', objToString(loginType));
}

function sessionData_Instruction(inst_id, inst_direction, inst_title, inst_body) {
    sessionStorage.setItem('ss_wcpilot_InstID',inst_id);
    sessionStorage.setItem('ss_wcpilot_InstDirection',inst_direction);
    sessionStorage.setItem('ss_wcpilot_InstTitle',inst_title);
    sessionStorage.setItem('ss_wcpilot_InstBody',inst_body);
}

function localData_login() {
    localStorage.setItem('ls_wcpilot_login', 'true');
}

////////////////////////////////////////////////////////////////////////////////
function objToString(obj) {
    if (obj === null) {
        return "";
    }
    else {
        return obj;
    }
}

////////////////////////////////////////////////////////////////////////////////
function formatDollar(num, digit) {
    if (digit === 0) {
        var int_num = parseInt(num);
        return "$" + int_num;
    }
    else {
        var p = num.toFixed(digit).split(".");
        return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return  num + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
    }
}

function revertDollar(amount) {
    var result = 0;
    
    if(amount !== "") {
        amount = amount.replace("$", "");
        amount = amount.replace(/\,/g,'');
        result = parseFloat(amount);
    }
    
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function textTruncate(t_size, t_value) {
    var t_default = t_value.length;
    var tr_text = "";
    
    if (t_default > t_size) {
        tr_text = t_value.substring(0, t_size);
        tr_text += " ...";
    }
    else
        tr_text = t_value;
    
    return tr_text;
}

function textReplaceApostrophe(str_value) {
    return str_value.replace(/'/g, "''");
}

////////////////////////////////////////////////////////////////////////////////
function getFileExtension(file_name) {
    return file_name.substr((file_name.lastIndexOf('.') +1)).toLowerCase();
}

////////////////////////////////////////////////////////////////////////////////
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

////////////////////////////////////////////////////////////////////////////////
function getToday() {
    var today = new Date();
    var day = today.getDate();
    var mon = today.getMonth()+1;
    var yr = today.getFullYear();
    return mon + "/" + day + "/" + yr;
}

function convertDBDateTimeToString(date_time) {
    if (date_time === null || date_time === "") {
        return "";
    }
    else {
        var a = date_time.split(" ");
        var d = a[0].split("-");
        var t = a[1].split(":");
        var sel_date_time = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

        var day = sel_date_time.getDate();
        var mon = sel_date_time.getMonth()+1;
        var yrs = sel_date_time.getFullYear();
        var hrs = sel_date_time.getHours();
        var min = sel_date_time.getMinutes();
        var shift = "AM";
        if (hrs >= 12) {
            if (hrs > 12) {
                hrs -= 12;
            }
            shift = "PM";
        }

        if (min < 10) {
            min = "0" + min;
        }

        return mon + "/" + day + "/" + yrs + " " + hrs + ":" + min + " " + shift;
    }
}

function convertDBDateToString(date_time) {
    if (date_time === null || date_time === "") {
        return "";
    }
    else {
        var a = date_time.split(" ");
        var d = a[0].split("-");
        var t = a[1].split(":");
        var sel_date_time = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

        var day = sel_date_time.getDate();
        var mon = sel_date_time.getMonth()+1;
        var yrs = sel_date_time.getFullYear();
        
        if (mon < 10) {
            mon = "0" + mon;
        }

        return mon + "/" + day + "/" + yrs;
    }
}

////////////////////////////////////////////////////////////////////////////////
function getDTUIStamp() {
    var result = "";
    var cur_dt = new Date();
    
    result += cur_dt.getFullYear();
    result += cur_dt.getMonth() + 1;
    result += cur_dt.getDate();
    result += cur_dt.getHours();
    result += cur_dt.getMinutes();
    result += cur_dt.getMilliseconds();
    
    return result;
}

////////////////////////////////////////////////////////////////////////////////
function getRandomInstruction() {
    var instruction = "instruction_1.html";
    var random = Math.floor(Math.random()*5);
    switch(random) {
        case 0:
            instruction = "instruction_1.html";
            break;
        case 1:
            instruction = "instruction_2.html";
            break;
        case 2:
            instruction = "instruction_3.html";
            break;
        case 3:
            instruction = "instruction_4.html";
            break;
        case 4:
            instruction = "instruction_5.html";
            break;
        default:
            break;
    }
    return instruction;
}