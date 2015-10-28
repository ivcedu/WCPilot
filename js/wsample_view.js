var wsample_id = "";
var reader_id = "";
var selected_reader = "";

var r1_score = 0;
var r2_score = 0;

var r3_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        getURLParameters();
        getLoginReaderInfo();
        getReaderSelection();

        if (selected_reader === "") {
            window.open('wsample_print.html?wsample_id=' + wsample_id, '_self');
            return false;
        }
        else {
            getWSample();
        }
    }
    else {
        window.open('login.html', '_self');
    }
};

$(window).bind("resize click", function () {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});

////////////////////////////////////////////////////////////////////////////////
function getURLParameters() {
    var searchStr = location.search;
    //var section = location.hash.substring(1,location.hash.length);
    var searchArray = new Array();
    while (searchStr!=='') 
    {
        var name, value;
        // strip off leading ? or &
        if ((searchStr.charAt(0)==='?')||(searchStr.charAt(0)==='&')) 
            searchStr = searchStr.substring(1,searchStr.length);
        // find name
        name = searchStr.substring(0,searchStr.indexOf('='));
        // find value
        if (searchStr.indexOf('&')!==-1) 
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.indexOf('&'));
        else 
            value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.length);
        // add pair to an associative array
        value = value.replace("%20", " ");
        searchArray[name] = value;
        // cut first pair from string
        if (searchStr.indexOf('&')!==-1) 
            searchStr =  searchStr.substring(searchStr.indexOf('&')+1,searchStr.length);
        else 
            searchStr = '';
    }
    
    wsample_id = searchArray['wsample_id'];
}

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();
    
    // Handle minimalize sidebar menu
    $('.hide-menu').click(function(event){
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    });
    
    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();
    
    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    
    // Initialize animate panel function
    $('.animate-panel').animatePanel();
    
    // Function for collapse hpanel
    $('.showhide').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });
    
    // Function for close hpanel
    $('.closebox').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
    });
    
    // Function for small header
    $('.small-header-action').click(function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });
    
//    $('body').addClass('page-small');
        
    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
    
    // Sparkline bar chart data and options used under Profile image on left navigation panel
    $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
        type: 'bar',
        barWidth: 7,
        height: '30px',
        barColor: '#62cb31',
        negBarColor: '#53ac2a'
    });
    
    // Initialize tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });

    // Initialize popover
    $("[data-toggle=popover]").popover();

    // Move modal to body
    // Fix Bootstrap backdrop issue with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // scoring guide button click //////////////////////////////////////////////
    $('#btn_score_guide').click(function() {
        window.open('doc/IVC_Writing_Sample_Scoring_Guide.pdf', '_blank');
        return false;
    });
    
    // generic prompt button click /////////////////////////////////////////////
    $('#btn_generic_prompt').click(function() {
        window.open('doc/Generic_Prompt.pdf', '_blank');
        return false;
    });
    
    // instruction title click /////////////////////////////////////////////////
    $('#instruction').click(function() {
        var inst_detail = db_getInstructionByTitle($('#title').html());
        $('#mod_instruction_title').html($('#title').html());
        $('#mod_instruction_detail').html(inst_detail);
    });

    // submit button click /////////////////////////////////////////////////////
    $('#btn_submit').click(function() {
        var score = $('#score_list').val();
        if (score === "0") {
            swal({ title: "Warning!", text: "Please select score value", type: "warning" });
            return false;
        }
        
        $('#btn_submit').prop('disabled',true);
        updateScoreValues();
        swal({ 
                title: "Saved!", 
                text: "Your score has been saved", 
                type: "success",
                showCancelButton: false,
                closeOnConfirm: false
            }, function() {
                window.open('scores.html', '_self');
                return false;
            }
        );
    });

    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

////////////////////////////////////////////////////////////////////////////////
function fixWrapperHeight() {
    // Get and set current height
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

// Animate panel function
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn';};
    if(!delay) { delay = 0.06; } else { delay = delay / 10; };
    if(!child) { child = '.row > div';} else {child = "." + child;};

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opactiy to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('animated-panel').addClass(effect);

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginReaderInfo() {
    var result = new Array();
    result = db_getReaderByEmail(sessionStorage.getItem('ss_wcpilot_loginEmail'));
    
    if (result.length === 1) {
        reader_id = result[0]['ReaderID'];
        $('#panel_header').html("Login: " + result[0]['ReaderName']);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getReaderSelection() {
    var result = new Array();
    result = db_getSelectedScore(wsample_id);
    
    if (result.length === 1) {
        r1_score = Number(result[0]['R1Score']);
        r2_score = Number(result[0]['R2Score']);
        r3_id = result[0]['R3ID'];
        
        if (result[0]['R1ID'] === reader_id) {
            if (result[0]['R1StatusID'] === "1") {
                selected_reader = "R1";
            }
        }
        else if (result[0]['R2ID'] === reader_id) {
            if (result[0]['R2StatusID'] === "1") {
                selected_reader = "R2";
            }
        }
        else if (result[0]['R3ID'] === reader_id) {
            if (result[0]['R3StatusID'] === "1") {
                selected_reader = "R3";
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getWSample() {
    var result = new Array();
    result = db_getWSample(wsample_id);
    
    if (result.length === 1) {   
        $('#title').html(result[0]['Title']);
        $('#created').html("Created by: " + result[0]['StudentName'] + " " + convertDBDateTimeToString(result[0]['SubmissionDate']));
        $('#essay').append(result[0]['Essay']);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateScoreValues() {
    var col_status = selected_reader + "StatusID";
    var col_score = selected_reader + "Score";
    var col_esl = selected_reader + "ESL";
    var col_date_score = selected_reader + "DateScore";
    var score = $('#score_list').val();
    var esl = $('#score_esl').is(':checked');
    
    if (selected_reader === "R1") {
        r1_score = Number(score);
    }
    else if (selected_reader === "R2") {
        r2_score = Number(score);
    }
    
    db_updateScore(wsample_id, col_status, 3, col_score, score, col_esl, esl, col_date_score);
    
    if (selected_reader === "R3") {
        db_updateWSampleStatus(wsample_id, 3);
        StudentESLPlacement();
    }
    else {
        setThirdReaderScore();
    }
}

function setThirdReaderScore() {    
    if ((r1_score > 0 && r1_score < 4) || (r2_score > 0 && r2_score < 4)) {
        if (r1_score !== r2_score && r1_score > 0 && r2_score > 0) {
            db_updateScoreThirdReader(wsample_id, 1);
        }  
        else if (r1_score === r2_score && r1_score > 0 && r2_score > 0) {
            db_updateWSampleStatus(wsample_id, 3);
            StudentESLPlacement();
        } 
    }
    else if (r1_score >= 4 && r2_score >= 4) {
        db_updateWSampleStatus(wsample_id, 3);
    } 
}

function StudentESLPlacement() {
    var result = new Array();
    result = db_getSelectedScore(wsample_id);
    var r1scr = Number(result[0]['R1Score']);
    var r3scr = Number(result[0]['R3Score']);
    
    if (r3scr === 1) {
        if(result[0]['R3ESL'] === "1") {
            emailToStudentESL();
        }
    }
    else if (r1scr === 1) {
        if(result[0]['R1ESL'] === "1" || result[0]['R2ESL'] === "1") {
            emailToStudentESL();
        }
    }
}

function emailToStudentESL() {
    var result = new Array();
    result = db_getWSample(wsample_id);
    if (result.length === 1) {
        sendEmailToStudentESLPlacement(result[0]['StudentName'], result[0]['StudentEmail']);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sendEmailToStudentESLPlacement(stu_name, stu_email) {
    var name = stu_name;
    var email = stu_email;
    
    var subject = "Writing Assessment";
    var message = "Dear student,<br/><br/>";
    message += "We recommend that you take the ESL assessment based on the results of your writing sample. For more information, visit our ESL Assessment page ";
    message += "If you have questions, please contact the Office of Admissions and Records at ivcam@ivc.edu or 949-451-5220.<br/><br/>";
    message += "Sincerely,<br/><br/>";
    message += "Student Success and Support Program<br/>";
    message += "Irvine Valley College";
    
    proc_sendEmail(email, name, subject, message);
}