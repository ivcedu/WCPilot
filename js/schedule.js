var select_date;
var add_event = false;
var update_event;
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {        
        $('.splash').css('display', 'none');
        getReaderList();
    }
    else {
        window.open('Login.html', '_self');
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
    // initialize fullcalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        selectable: true,
        dayClick: function(date, jsEvent, view) {
            var todaysEvents = getClientEvent();
            if (todaysEvents === date.format()) {
                swal({title: "Warning!", text: "Readers alread assigned", type: "warning"});
                return false;
            }
            add_event = true;
            $('#mod_header').html(date.format('dddd') + ", " + date.format('LL'));
            select_date = date.format();
            resetModalSelectDate();
            $('#mod_select_date').modal();
        },
        eventClick: function(calEvent, jsEvent, view) {
            add_event = false;
            update_event = calEvent;
            var str_header = calEvent.start.format('dddd') + ", " + calEvent.start.format('LL');
            var str_description = calEvent.description;
            getSelectCalendarEvent(str_header, str_description);
            $('#mod_select_date').modal();
        }
    });
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
    
    // timepicker
    $('#mod_body_start_time').timepicker();
    $('#mod_body_end_time').timepicker();

    // logout button click /////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // mod select date save button click ///////////////////////////////////////
    $('#mod_btn_save').click(function() {
        var r1_id = $('#mod_body_reader_1').val();
        var r2_id = $('#mod_body_reader_2').val();
        var r3_id = $('#mod_body_reader_3').val();
        var r1_name = $("#mod_body_reader_1 option:selected").text();
        var r2_name = $("#mod_body_reader_2 option:selected").text();
        var r3_name = $("#mod_body_reader_3 option:selected").text();

        var title = "Reader 1: " + r1_name + "\nReader 2: " + r2_name + "\nReader 3: " + r3_name;
        var description = "R1:" + r1_id + "||R2:" + r2_id + "||R3:" + r3_id;
        
        if (add_event) {
            $('#calendar').fullCalendar('renderEvent', {allDay: true, blocked: true, title: title, start: select_date, description: description});
        }
        else {
            update_event.title = title;
            update_event.description = description;
            $('#calendar').fullCalendar('updateEvent', update_event);
        }
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
function resetModalSelectDate() {    
    $('#mod_body_reader_1').val('0');
    $('#mod_body_reader_1').selectpicker('refresh');
    $('#mod_body_reader_2').val('0');
    $('#mod_body_reader_2').selectpicker('refresh');
    $('#mod_body_reader_3').val('0');
    $('#mod_body_reader_3').selectpicker('refresh');
}

function getSelectCalendarEvent(str_header, str_description) {
    var ar_reader = str_description.split('||');
    var r1 = ar_reader[0].replace("R1:", "");
    var r2 = ar_reader[1].replace("R2:", "");
    var r3 = ar_reader[2].replace("R3:", "");
    
    $('#mod_header').html(str_header);
    $('#mod_body_reader_1').val(r1);
    $('#mod_body_reader_1').selectpicker('refresh');
    $('#mod_body_reader_2').val(r2);
    $('#mod_body_reader_2').selectpicker('refresh');
    $('#mod_body_reader_3').val(r3);
    $('#mod_body_reader_3').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getClientEvent() {
    var client_date = "";
    $('#calendar').fullCalendar('clientEvents', function(event) { 
        client_date = event.start.format(); 
    });
    
    return client_date;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getReaderList() {
    var result = new Array();
    result = db_getReaderList();
    
    var opt_html = "<option value ='0' selected>Select</option>";
    for (var i = 0; i < result.length; i++) {
        opt_html += "<option value ='" + result[i]['ReaderID'] + "'>" + result[i]['ReaderName'] + "</option>";
    }
    
    $('#mod_body_reader_1').append(opt_html);
    $('#mod_body_reader_1').selectpicker('refresh');
    $('#mod_body_reader_2').append(opt_html);
    $('#mod_body_reader_2').selectpicker('refresh');
    $('#mod_body_reader_3').append(opt_html);
    $('#mod_body_reader_3').selectpicker('refresh');
}