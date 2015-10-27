var student_id = "";
var dt_start;
var dt_end;
var duration = 0;

var r1_id = "";
var r1_name = "";
var r1_email = "";
var r2_id = "";
var r2_name = "";
var r2_email = "";
var r3_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        dt_start = new Date();
        
        valifiedStudentExistance();
        setPanelHeader();
        setInstruction();
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // Add special class to minimalize page elements when screen is less than 768px
//    setBodySmall();
    $('body').addClass('page-small');
    
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
        
    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
    
    // Move modal to body
    // Fix Bootstrap backdrop issue with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Initialize summernote plugin
    $('.summernote').summernote({ height: 600 });

    // Initialize time circles
    $("#CountDownTimer").TimeCircles({ 
        count_past_zero: false,
        time: { Days: { show: false }, Hours: { show: false } } 
    })
    .addListener( function (unit, value, total) {
            if (total === 300) {
                swal({title: "Warning!", text: "Your session will expire in 5 minutes. Timer runs out, your writting sample will be submitted automatically", type: "warning"});
            }
            else if (total === 0) {
                $('#btn_submit').hide();
                $('#alarm_clock_animate').hide();
                addWSample();
                
                sessionStorage.clear();
                window.open('complete.html', '_self');
                return false;
            }
        }
    );

    $('#btn_view_instruction').click(function() {
        $('#mod_body_instruction').html(sessionStorage.getItem('ss_wcpilot_InstDirection'));
    });

    $('#btn_submit').click(function() {
        $('#btn_submit').hide();
        addWSample();
        
        sessionStorage.clear();
        window.open('complete.html', '_self');
        return false;
    });
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
function valifiedStudentExistance() {
    var stu_email = sessionStorage.getItem('ss_wcpilot_loginEmail');
    student_id = db_getStudentInfo(stu_email);
    
    if (student_id === null) {
        var stu_id = sessionStorage.getItem('ss_wcpilot_loginID');
        var stu_name = sessionStorage.getItem('ss_wcpilot_loginName');
        student_id = db_insertStudentInfo(stu_id, stu_name, stu_email);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setPanelHeader() {
    var stu_name = sessionStorage.getItem('ss_wcpilot_loginName');
    $('#panel_header').html("Name: " + stu_name);
}

function setInstruction() {
    var inst_html = "<b>" + sessionStorage.getItem('ss_wcpilot_InstTitle') + "</b><br/><br/>"; 
    inst_html += sessionStorage.getItem('ss_wcpilot_InstBody');
    $('#inst_body').html(inst_html);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addWSample() {
    dt_end = new Date();
    duration = Number(((new Date(dt_end - dt_start))/1000)/60).toFixed(0);
    
    var db_start = $.formatDateTime('yy-mm-dd hh:ii:ss', dt_start);
    var db_end = $.formatDateTime('yy-mm-dd hh:ii:ss', dt_end);
    
    var inst_id = sessionStorage.getItem('ss_wcpilot_InstID');
    var title = sessionStorage.getItem('ss_wcpilot_InstTitle');
    var sHTML = $.trim(textReplaceApostrophe($('.summernote').code()));
    
    getActiveReaderGrp();
    var wsample_id = db_insertWSample(student_id, db_start, db_end, duration, inst_id, title, sHTML);
    db_insertScore(wsample_id, r1_id, 1, r2_id, 1, r3_id);
    setNextActiveReaderGrp();
}

function getActiveReaderGrp() {
    var result = new Array();
    result = db_getActiveReaderGrp();
    
    r1_id = result[0]['R1ID'];
    r1_name = result[0]['R1Name'];
    r1_email = result[0]['R1Email'];
    r2_id = result[0]['R2ID'];
    r2_name = result[0]['R2Name'];
    r2_email = result[0]['R2Email'];
    r3_id = result[0]['R3ID'];
}

function setNextActiveReaderGrp() {
    var result = new Array();
        result = db_getReaderGrpListEnable();

        var next_grp_id = "";
        for (var i = 0; i < result.length; i++) {
            if (result[i]['Active'] === "1") {
                db_updateActiveReaderGrp(result[i]['ReaderGrpID'], 0);
                if (i+1 === result.length) {
                    next_grp_id = result[0]['ReaderGrpID'];
                }
                else {
                    next_grp_id = result[i+1]['ReaderGrpID'];
                }
                break;
            }
        }

        db_updateActiveReaderGrp(next_grp_id, 1);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function sendEmailToReader(reader_name, reader_email) {
//    var name = reader_name;
//    var email = reader_email;
//    // testing
//    email = "stafftest@ivc.edu";
//    
//    var subject = "Writing Assessment";
//    var message = "Dear " + name + ", <br><br>";
//    message += "You have essays to read. Please remember that you must submit your scores for these essays within the four-day time limit so that Dan and Brenda ";
//    message += "have time to check for third reads to meet the 5-day limit.<br/><br/>";
//    message += "Thank you.";
//    
//    proc_sendEmail(email, name, subject, message);
//}