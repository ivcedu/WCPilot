var id = "";
var name = "";
var email = "";
var login_type = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {  
    $('#logn_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 6)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 11)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() { 
        var url_param = sessionStorage.getItem('ss_wcpilot_url_param');
        if(loginInfo()) {
            if (url_param === null) {
                if (email === null || typeof email === 'Undefined') {
                    swal({title: "Login Error", text: "There was an error getting your information from Active Directory. please send an email to ivctech@ivc.edu to open a support request or call 949.451.5696", type: "error"});
                    return false;
                }
                else {
                    if (login_type === "Student") {
                        sessionData_login(id, name, email, login_type);
                        window.open('instruction.html', '_self'); 
                        return false;
                    }
                    else {
                        if (!staffValidation()) {
                            swal({title: "Access Denied", text: "Only writing center staff or student can access", type: "error"});
                            return false;
                        }
                        sessionData_login(id, name, email, login_type);
                        window.open('scores.html', '_self');
                        return false;
                    }
                }
            }
            else {
                sessionData_login(id, name, email, login_type);
                window.open(url_param, '_self');
                return false;
            }
        }
        else {
            $('#error_msg').html("Invalid username or password");
            $('#logn_error').show();
            return false;
        }
    });
    
    $.backstretch(["images/wcpilot_back_web_1.jpg"], {duration: 3000, fade: 750});
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var result = new Array();
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    var password = $('#password').val();
    
    result = getLoginUserInfo("php/login.php", username, password);
    if (result.length === 0) {
        result = getLoginUserInfo("php/login_student.php", username, password);
    }
    
    if (result.length === 0) {
        return false;
    }
    else {
        id = result[0];
        name = result[1];
        email = result[2];
        login_type = result[3];
        
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////
function staffValidation() {
    var result = new Array();
    result = db_getAdminByEmail(email);
    
    if (result.length === 0) {
        result = db_getReaderByEmail(email);
    }
    
    if (result.length === 0) {
        return false;
    }
    else {
        return true;
    }
}