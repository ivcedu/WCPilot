var reader_id = "";
var m_table;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        getLoginInfo();
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
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    $('#btn_new_reader').click(function() {
        reader_id = "";
        resetModReaderInfo();
        $('#mod_reader_header').html("New Reader Setting");
    });
    
    // rating user list edit button click //////////////////////////////////////
    $('table').on('click', 'a[id^="edit_reader_id_"]', function() {
        reader_id = $(this).attr('id').replace("edit_reader_id_", "");
        $('#mod_reader_header').html("Edit Reader Setting");
        
        resetModReaderInfo();
        getSelectedReaderInfo();
        $('#mod_reader').modal('show');
    });
    
    // modal reader save button click //////////////////////////////////////////
    $('#mod_btn_reader_save').click(function() {
        var reader_name = $.trim(textReplaceApostrophe($('#mod_reader_mame').val()));
        var reader_email = $.trim(textReplaceApostrophe($('#mod_reader_email').val()));
        var active = $('#mod_reader_active').is(':checked');
        
        if (reader_name === "" || reader_email === "") {
            swal({title: "Warning!", text: "Reader name and email are required", type: "warning"});
            return false;
        }
        
        if (reader_id === "") {
            addReaderToDB(active, reader_name, reader_email);
        }
        else {
            updateReaderToDB(active, reader_name, reader_email);
        }
        
        var note = "Reader has been saved";
        if (!active) {
            note += "\nPlease update Reader Group setting";
        }
        
        $('#mod_reader').modal('hide');
        getReaderList();
        
        setTimeout(function(){ swal({title: "Saved!", text: note, type: "success"}); }, 500);
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_reader_list').DataTable({ paging: false, bInfo: false, searching: false });
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
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_wcpilot_loginName');
    $('#login_user').html(login_name);
}

function resetModReaderInfo() {
    $('#mod_reader_mame').val("");
    $('#mod_reader_email').val("");
    $('#mod_reader_active').prop('checked', false);
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSelectedReaderInfo() {
    var result = new Array();
    result = db_getSelectedReader(reader_id);
    
    if (result.length === 1) {
        $('#mod_reader_mame').val(result[0]['ReaderName']);
        $('#mod_reader_email').val(result[0]['ReaderEmail']);

        if (result[0]['Active'] === "1") {
            $('#mod_reader_active').prop('checked', true);
        }
    }
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function setReaderHTML(id) {
//    var html = "<div class='row' id='reader_id_" + id + "'>";
//    html += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
//    html += "<div class='hpanel hblue contact-panel'>";
//    html += "<div class='panel-body'>";  
//
//    html += "<div class='row'>";
//    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>Reader Name:</div>";
//    html += "<div class='col-xs-6 col-sm-8 col-md-9 col-lg-10' id='reader_name_" + id + "'></div>";
//    html += "</div>";
//    html += "<br/>";
//    html += "<div class='row'>";
//    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>Reader Email:</div>";
//    html += "<div class='col-xs-6 col-sm-8 col-md-9 col-lg-10' id='reader_email_" + id + "'></div>";
//    html += "</div>";
//    html += "<br/>";
//    html += "<div class='row'>";
//    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>";
//    html += "<label><input type='checkbox' class='i-checks' disabled id='reader_active_" + id + "'> Active</label>";
//    html += "</div>";
//    html += "</div>";
//    html += "<br/>";
//    html += "<p>";
//    html += "<button type='button' class='btn btn-primary w-xs' data-toggle='modal' data-target='#mod_reader' id='btn_reader_edit_" + id + "'>Edit</button>";
//    html += "</p>";
//    
//    html += "</div>";
//    html += "</div>";
//    html += "</div>";
//    html += "</div>";
//    
//    $('#reader_list').append(html);
//}

//function setReaderValues(id, active, reader_name, reader_email) {   
//    $('#reader_name_' + id).html(reader_name);
//    $('#reader_email_' + id).html(reader_email);
//    
//    if (active === "1" || active === true) {
//        $('#reader_active_' + id).prop('checked', true);
//    }
//    else {
//        $('#reader_active_' + id).prop('checked', false);
//    }
//}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getReaderList() {
    var result = new Array();
    result = db_getReaderList2();
    
    m_table.clear();
    m_table.rows.add(result).draw();
    
    $('.animate-panel').animatePanel();
    
//    $('#reader_list').empty();
//    for (var i = 0; i < result.length; i++) {
//        setReaderHTML(result[i]['ReaderID']);
//        setReaderValues(result[i]['ReaderID'], result[i]['Active'], result[i]['ReaderName'], result[i]['ReaderEmail']);
//    }
//    
//    $('.i-checks').iCheck({
//        checkboxClass: 'icheckbox_square-green',
//        radioClass: 'iradio_square-green'
//    });
//    
//    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addReaderToDB(active, reader_name, reader_email) {
    reader_id = db_insertReader(active, reader_name, reader_email);
//    setReaderHTML(reader_id);
//    setReaderValues(reader_id, active, reader_name, reader_email);
//    
//    $('.i-checks').iCheck({
//        checkboxClass: 'icheckbox_square-green',
//        radioClass: 'iradio_square-green'
//    });
}

function updateReaderToDB(active, reader_name, reader_email) {
    db_updateReader(reader_id, active, reader_name, reader_email);
    
//    if (db_updateReader(reader_id, active, reader_name, reader_email)) {
//        setReaderValues(reader_id, active, reader_name, reader_email);
//    }
//    
//    $('.i-checks').iCheck({
//        checkboxClass: 'icheckbox_square-green',
//        radioClass: 'iradio_square-green'
//    });
}