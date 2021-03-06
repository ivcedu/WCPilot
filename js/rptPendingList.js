var wsample_id = "";
var m_table;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {   
        $('.splash').css('display', 'none');
        if (!getAdminByEmail()) {
            hideSideMenu();
        }  
        getLoginInfo();
        getWSampleList();
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
    
    $('#tbl_pending_list').dataTable().draw(false);
    $('.dataTables_scrollBody thead tr').css({visibility:'collapse'});
});

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

    // table header click event ////////////////////////////////////////////////
    $('#tbl_pending_list thead').on('click', 'th', function () {
        $('.dataTables_scrollBody thead tr').css({visibility:'collapse'});
    });
    
    // table wsample title click event /////////////////////////////////////////
    $('table').on('click', 'a[id^="wsample_id_"]', function() {
        wsample_id = $(this).attr('id').replace("wsample_id_", "");
        window.open('wsample_print.html?wsample_id=' + wsample_id, '_blank');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_pending_list').DataTable({ paging: false, bInfo: false, scrollX: true });
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
function hideSideMenu() {
    $('#menu_administrator').hide();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_wcpilot_loginName');
    $('#login_user').html(login_name);
}

function getAdminByEmail() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_wcpilot_loginEmail'));
    
    if (result.length === 1) {
        return true;
    }
    else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function setWSampleListHTML(wsample_id, student_id, student_name, duration, submission_date,
//                            r1_name, r1_score, r1_esl, r1_date_score,
//                            r2_name, r2_score, r2_esl, r2_date_score,
//                            r3_name, r3_status, r3_score, r3_esl, r3_date_score) { 
//                                
//    var r3_score_html = "";
//    if (r3_status === "1" && r3_score === null) {
//        r3_score_html = "waiting";
//    }
//    else if (r3_status === "1" && r3_score !== null) {
//        r3_score_html = r3_score;
//    }
//                                
//    var html = "<tr>";
//    html += "<td>" + wsample_id + "</td>";
//    html += "<td>" + student_id + "</td>";
//    html += "<td>" + student_name + "</td>";
//    html += "<td><a href=# id='wsample_id_" + wsample_id + "'><i class='fa fa-file'></i></a></td>";
//    html += "<td>" + duration + "</td>";
//    html += "<td>" + convertDBDateTimeToString(submission_date) + "</td>";
//    html += "<td>" + r1_name + "</td>";
//    html += "<td>" + (r1_score === null ? "waiting" : r1_score) + "</td>";
//    html += "<td>" + ((r1_esl === null || r1_esl === "0") ? "" : "Yes") + "</td>";
//    html += "<td>" + (r1_date_score === null ? "" : convertDBDateTimeToString(r1_date_score)) + "</td>";
//    html += "<td>" + r2_name + "</td>";
//    html += "<td>" + (r2_score === null ? "waiting" : r2_score) + "</td>";
//    html += "<td>" + ((r2_esl === null || r2_esl === "0") ? "" : "Yes") + "</td>";
//    html += "<td>" + (r2_date_score === null ? "" : convertDBDateTimeToString(r2_date_score)) + "</td>";
//    html += "<td>" + (r3_name === null  ? "" : r3_name) + "</td>";
//    html += "<td>" + r3_score_html + "</td>";
//    html += "<td>" + ((r3_esl === null || r3_esl === "0") ? "" : "Yes") + "</td>";
//    html += "<td>" + (r3_date_score === null  ? "" : convertDBDateTimeToString(r3_date_score)) + "</td>";
//    html += "</tr>";
//    
//    return html;
//}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getWSampleList() {
    var result = new Array();
    result = db_getPendingList();
    
    m_table.clear();
    m_table.rows.add(result).draw();
    $('.dataTables_scrollBody thead tr').css({visibility:'collapse'});
    
    $('.animate-panel').animatePanel();
    
//    $('#tbl_body').empty();
//    var html = "";
//    for (var i = 0; i < result.length; i++) {
//        html += setWSampleListHTML(result[i]['WSampleID'], result[i]['StudentID'], result[i]['StudentName'],
//                                    result[i]['Duration'], result[i]['SubmissionDate'],
//                                    result[i]['R1Name'], result[i]['R1Score'], result[i]['R1ESL'], result[i]['R1DateScore'],
//                                    result[i]['R2Name'], result[i]['R2Score'], result[i]['R2ESL'], result[i]['R2DateScore'],
//                                    result[i]['R3Name'], result[i]['R3Status'], result[i]['R3Score'], result[i]['R3ESL'], result[i]['R3DateScore']);
//    }
//    $('#tbl_body').append(html);
//    
//    $('#tbl_pending_list').dataTable({ paging: false, searching: false, bInfo: false, scrollX: true,
//                                        "initComplete": function(settings, json) { $('.dataTables_scrollBody thead tr').css({visibility:'collapse'}); } });
//    $('.animate-panel').animatePanel();
}