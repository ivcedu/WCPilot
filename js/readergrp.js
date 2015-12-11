var reader_grp_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        getLoginInfo();
        getReaderList();
        getReaderGrpList();
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
    
    // new reader group button click ///////////////////////////////////////////
    $('#btn_new_reader_grp').click(function() {
        reader_grp_id = "";
        resetModReaderGrpInfo();
        $('#mod_reader_grp_header').html("New Reader Group Setting");
    });
    
    // edit select group button click //////////////////////////////////////////
    $('#btn_edit_select_grp').click(function() {
        getReaderGrpListAll();
    });
    
    // modal reader group save button click ////////////////////////////////////
    $('#mod_btn_reader_grp_save').click(function() {
        var grp_name = $.trim(textReplaceApostrophe($('#mod_group_mame').val()));
        var grp_enable = $('#mod_grp_enable').is(':checked');
        var r1_id = $('#mod_body_reader_1').val();
        var r2_id = $('#mod_body_reader_2').val();
        var r3_id = $('#mod_body_reader_3').val();
        var r1_name = $("#mod_body_reader_1 option:selected").text();
        var r2_name = $("#mod_body_reader_2 option:selected").text();
        var r3_name = $("#mod_body_reader_3 option:selected").text();
        
        if (r1_id === "0" || r2_id === "0" || r3_id === "0") {
            swal({title: "Warning!", text: "Please select reader", type: "warning"});
            return false;
        }
        
        if (reader_grp_id === "") {
            addReaderGrpToDB(grp_name, grp_enable, r1_id, r2_id, r3_id, r1_name, r2_name, r3_name);
        }
        else {
            updateReaderGrpToDB(grp_name, grp_enable, r1_id, r2_id, r3_id, r1_name, r2_name, r3_name);
        }
        
        swal({title: "Saved!", text: "Reader group has been saved", type: "success"});
        return false;
    });
    
    // modal select group save button click ////////////////////////////////////
    $('#mod_btn_select_grp_save').click(function() {
        var reader_grp_id = $('#mod_body_select_grp').val();
        db_updateReaderGrpCurrentActive(reader_grp_id);
        
        swal({title: "Saved!", text: "Assigned new active reader group has been saved", type: "success"});
        return false;
    });
    
    // reader group list edit button click /////////////////////////////////////
    $(document).on('click', 'button[id^="btn_reader_grp_edit_"]', function() {
        reader_grp_id = $(this).attr('id').replace("btn_reader_grp_edit_", "");
        $('#mod_reader_grp_header').html("Edit Reader Group Setting");
        
        resetModReaderGrpInfo();
        getSelectedReaderGrpInfo();
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
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_wcpilot_loginName');
    $('#login_user').html(login_name);
    
    if (login_name !== "Rich Kim" && login_name !== "Bruce Hagan") {
        $('#btn_edit_select_grp').hide();
    }
}

function resetModReaderGrpInfo() {
    $('#mod_group_mame').val("");
    $('#mod_grp_enable').prop('checked', false);
    $('#mod_body_reader_1').val('0');
    $('#mod_body_reader_1').selectpicker('refresh');
    $('#mod_body_reader_2').val('0');
    $('#mod_body_reader_2').selectpicker('refresh');
    $('#mod_body_reader_3').val('0');
    $('#mod_body_reader_3').selectpicker('refresh');
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSelectedReaderGrpInfo() {
    var result = new Array();
    result = db_getSelectedReaderGrp(reader_grp_id);
    
    if (result.length === 1) {
        $('#mod_group_mame').val(result[0]['GrpName']);
        if (result[0]['GrpEnable'] === "1") {
            $('#mod_grp_enable').prop('checked', true);
        }
        $('#mod_body_reader_1').val(result[0]['R1ID']);
        $('#mod_body_reader_1').selectpicker('refresh');
        $('#mod_body_reader_2').val(result[0]['R2ID']);
        $('#mod_body_reader_2').selectpicker('refresh');
        $('#mod_body_reader_3').val(result[0]['R3ID']);
        $('#mod_body_reader_3').selectpicker('refresh');
    }
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setReaderGrpHTML(id) {
    var html = "<div class='row' id='reader_grp_id_" + id + "'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
    html += "<div class='hpanel hblue contact-panel'>";
    html += "<div class='panel-body'>";  

    html += "<div class='row'>";
    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>Group Name:</div>";
    html += "<div class='col-xs-6 col-sm-8 col-md-9 col-lg-10' id='grp_name_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<div class='row'>";
    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>";
    html += "<label><input type='checkbox' class='i-checks' disabled id='grp_enable_" + id + "'> Active Group</label>";
    html += "</div>";
    html += "</div>";
    html += "<br/>";
    html += "<div class='row'>";
    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>Reader 1:</div>";
    html += "<div class='col-xs-6 col-sm-8 col-md-9 col-lg-10' id='r1_name_" + id + "'></div>";
    html += "<div style='display: none;' id='r1_id_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<div class='row'>";
    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>Reader 2:</div>";
    html += "<div class='col-xs-6 col-sm-8 col-md-9 col-lg-10' id='r2_name_" + id + "'></div>";
    html += "<div style='display: none;' id='r2_id_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<div class='row'>";
    html += "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>Reader 3:</div>";
    html += "<div class='col-xs-6 col-sm-8 col-md-9 col-lg-10' id='r3_name_" + id + "'></div>";
    html += "<div style='display: none;' id='r3_id_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<p>";
    html += "<button type='button' class='btn btn-primary w-xs' data-toggle='modal' data-target='#mod_reader_grp' id='btn_reader_grp_edit_" + id + "'>Edit</button>";
    html += "</p>";
    
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    $('#reader_grp_list').append(html);
}

function setReaderGrpValues(id, grp_name, grp_enable, r1_id, r2_id, r3_id, r1_name, r2_name, r3_name) {
    $('#grp_name_' + id).html(grp_name);
    if (grp_enable === "1" || grp_enable === true) {
        $('#grp_enable_' + id).prop('checked', true);
    }
    else {
        $('#grp_enable_' + id).prop('checked', false);
    }
    $('#r1_name_' + id).html(r1_name);
    $('#r1_id_' + id).html(r1_id);
    $('#r2_name_' + id).html(r2_name);
    $('#r2_id_' + id).html(r2_id);
    $('#r3_name_' + id).html(r3_name);
    $('#r3_id_' + id).html(r3_id);
    
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getReaderList() {
    var result = new Array();
    result = db_getReaderListActive();
    
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

function getReaderGrpList() {
    var result = new Array();
    result = db_getReaderGrpList();
    
    $('#reader_grp_list').empty();
    for (var i = 0; i < result.length; i++) {
        setReaderGrpHTML(result[i]['ReaderGrpID']);
        setReaderGrpValues(result[i]['ReaderGrpID'], result[i]['GrpName'], result[i]['GrpEnable'], result[i]['R1ID'], result[i]['R2ID'], result[i]['R3ID'], result[i]['R1Name'], result[i]['R2Name'], result[i]['R3Name']);
    }
    
    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getReaderGrpListAll() {
    var result = new Array();
    result = db_getReaderGrpListAll();
    
    $('#mod_body_select_grp').empty();
    var opt_html = "";
    var cur_selected = "";
    for (var i = 0; i < result.length; i++) {
        opt_html += "<option value ='" + result[i]['ReaderGrpID'] + "'>" + result[i]['GrpName'] + "</option>";
        if (result[i]['Active'] === "1") {
            cur_selected = result[i]['ReaderGrpID'];
        }
    }
    
    $('#mod_body_select_grp').append(opt_html);
    $('#mod_body_select_grp').val(cur_selected);
    $('#mod_body_select_grp').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addReaderGrpToDB(grp_name, grp_enable, r1_id, r2_id, r3_id, r1_name, r2_name, r3_name) {
    reader_grp_id = db_insertReaderGrp(grp_enable, grp_name, r1_id, r2_id, r3_id);
    setReaderGrpHTML(reader_grp_id);
    setReaderGrpValues(reader_grp_id, grp_name, grp_enable, r1_id, r2_id, r3_id, r1_name, r2_name, r3_name);
}

function updateReaderGrpToDB(grp_name, grp_enable, r1_id, r2_id, r3_id, r1_name, r2_name, r3_name) {
    if (db_updateReaderGrp(reader_grp_id, grp_enable, grp_name, r1_id, r2_id, r3_id)) {
        setReaderGrpValues(reader_grp_id, grp_name, grp_enable, r1_id, r2_id, r3_id, r1_name, r2_name, r3_name);
    }
}