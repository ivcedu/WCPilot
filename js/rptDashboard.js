////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {   
        $('.splash').css('display', 'none');
        if (!getAdminByEmail()) {
            hideSideMenu();
        } 
        getLoginInfo();
        getDashboardList();
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
function getDashboardList() {
    var result = new Array();
    result = db_getDashboardList();
    
    var str_html = "";
    for (var i = 0; i < result.length; i++) {
        var str_html_start = "";
        var str_html_end = "";
        if (i % 3 === 0) {
            str_html_start = "<div class='row'>";
        }
        if ((i+1) % 3 === 0) {
            str_html_end = "</div>";
        }
        
        var str_inst_summary = setDashboardListHTML(result[i]['InstructionID'], result[i]['Instruction'], result[i]['TotalRecords'], result[i]['InstructonCount'], result[i]['AvgDuration'], result[i]['AvgScore']);
        str_html += str_html_start + str_inst_summary + str_html_end;
    }
    $('#dashboard_list').append(str_html);
    drawPieChart(result);
    
    $('.animate-panel').animatePanel();
}

function setDashboardListHTML(instruction_id, instruction, total_records, instruction_count, avg_duration, avg_score) {    
    var html = "<div class='col-lg-4'><div class='hpanel stats'>";
    html += "<div class='panel-body h-200'>";
    html += "<div class='row'>";
    html += "<div class='col-lg-10'><div class='stats-title pull-left'><h3>" + instruction + "</h3></div></div>";
    html += "<div class='col-lg-2'><div class='stats-icon pull-right'><i class='pe-7s-share fa-4x'></i></div></div>";
    html += "</div>";
    html += "<div class='m-t-xl'>";
    
    html += "<span class='font-bold no-margins'><h4>Average Duration: " + avg_duration + " min</h4></span>";
    html += "<div class='progress m-t-xs full progress'>";
    html += "<div style='width: " + (Number(avg_duration)/60)*100 + "%' aria-valuemax='60' aria-valuemin='0' aria-valuenow='" + avg_duration + "' role='progressbar' class='progress-bar progress-bar-success'></div>";
    html += "</div>";
    
    html += "<span class='font-bold no-margins'><h4>Average Score: " + avg_score + " </h4></span>";
    html += "<div class='progress m-t-xs full progress'>";
    html += "<div style='width: " + (Number(avg_score)/6)*100 + "%' aria-valuemax='6' aria-valuemin='0' aria-valuenow='" + avg_score + "' role='progressbar' class='progress-bar progress-bar-success'></div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<div class='col-xs-6'>";
    html += "<span class='font-bold no-margins'><h4>Count / Total Records</h4></span>";
    html += "<h4>" + instruction_count + " / " + total_records + "</h4>";
    html += "</div>";
    html += "</div>";
    
    html += "<div class='row'>";
    html += "<canvas id='flot_pie_chart_" + instruction_id + "' height='140'></canvas>";
    html += "</div>";
    
    html += "</div>";
    html += "</div>";
    html += "<div class='panel-footer'></div>";
    html += "</div></div>";
    
    return html;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawPieChart(result) {  
    var pie_options = { 
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 0, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        responsive: true,
        tooltipTemplate: "<%= value %>%"
    };
    
    for (var i = 0; i < result.length; i++) {
        var inst_id = result[i]['InstructionID'];
        var inst_count = Number(result[i]['InstructonCount']);
        var other_count = Number(result[i]['TotalRecords']) - Number(result[i]['InstructonCount']);
        var total_count = Number(result[i]['TotalRecords']);
        var per_inst = Math.round((inst_count / total_count) * 10000) / 100;
        var per_oth = Math.round((other_count / total_count) * 10000) / 100;
        
        var data = [{ value: per_inst, color: "#84c465", highlight: "#b5dca3" }, { value: per_oth, color: "#cccccc", highlight: "#d9d9d9" }];
        var ctx = $("#flot_pie_chart_" + inst_id).get(0).getContext("2d");
        new Chart(ctx).Pie(data, pie_options);
    }
}