var wsample_id = "";
var m_table;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {   
        $('.splash').css('display', 'none');
        $('#start_date').hide();
        $('#end_date').hide();
        if (!getAdminByEmail()) {
            hideSideMenu();
        }  
        getLoginInfo();
        getDiscrepanciesList("All", "", "");
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
    
    $('#tbl_placement_list').dataTable().draw(false);
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
    
    // radio all button click event ////////////////////////////////////////////
    $('#rdo_all').on('ifChecked', function() {
        $('#start_date').val("");
        $('#end_date').val("");
        $('#start_date').hide();
        $('#end_date').hide();
    });
    
    // radio date range button click event /////////////////////////////////////
    $('#rdo_date_range').on('ifChecked', function() {
        $('#start_date').show();
        $('#end_date').show();
    });

    // refresh button click ////////////////////////////////////////////////////
    $('#btn_refresh').click(function() {
        var search_option = $("input[name=rdo_option]:checked").val();
        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();
        
        if (search_option === "Date_Range") {
            if (start_date === "" || end_date === "") {
                swal("Error", "Please select Start Date and End Date", "error");
                return false;
            }
        }
        
        getDiscrepanciesList(search_option, start_date, end_date);
        return false;
    });
    
    // excel button click //////////////////////////////////////////////////////
    $('#btn_excel').click(function() {
        var search_option = $("input[name=rdo_option]:checked").val();
        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();
        
        if (search_option === "Date_Range") {
            if (start_date === "" || end_date === "") {
                swal("Error", "Please select Start Date and End Date", "error");
                return false;
            }
        }
        
        var url_html = "SearchOption=" + search_option + "&StartDate=" + start_date + "&EndDate=" + end_date;
        location.href = "php/csv_saveDiscrepanciesList.php?" + url_html;
        return false;
    });
    
    // table header click event ////////////////////////////////////////////////
    $('#tbl_discrepancies_list thead').on('click', 'th', function () {
        $('.dataTables_scrollBody thead tr').css({visibility:'collapse'});
    });
    
    // table wsample title click event /////////////////////////////////////////
    $('table').on('click', 'a[id^="wsample_id_"]', function() {
        wsample_id = $(this).attr('id').replace("wsample_id_", "");
        window.open('wsample_print.html?wsample_id=' + wsample_id, '_blank');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_discrepancies_list').DataTable({ paging: false, bInfo: false, scrollX: true });
    
    // bootstrap datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
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
function getDiscrepanciesList(search_option, start_date, end_date) {
    var result = new Array();
    result = db_getDiscrepanciesList(search_option, start_date, end_date);

    m_table.clear();
    m_table.rows.add(result).draw();
    $('.dataTables_scrollBody thead tr').css({visibility:'collapse'});
    
    $('.animate-panel').animatePanel();
}