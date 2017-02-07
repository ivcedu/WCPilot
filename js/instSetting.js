var instruction_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        getLoginInfo();
        getInstructionList();
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
    // Initialize summernote plugin
    $('.summernote').summernote({ 
        height: 500,
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['color', ['color']]
        ]
    });

    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    $('#btn_new_instruction').click(function() {
        instruction_id = "";
        resetModInst();
    });
    
    // modal instruction save button click /////////////////////////////////////
    $('#mod_btn_inst_save').click(function() {
        var title = $.trim($('#mod_inst_title').val());
        var instruction = $.trim($('.summernote').code());
        
        if (title === "" || instruction === "") {
            swal({title: "Warning!", text: "Title and instruction are required", type: "warning"});
            return false;
        }
        
        if (instruction_id === "") {
            addInstructionToDB(title, instruction);
        }
        else {
            updateInstructionToDB(title, instruction);
        }
        
        swal({title: "Saved!", text: "Instruction has been saved", type: "success"});
        return false;
    });
    
    // instruction list edit button click //////////////////////////////////////
    $(document).on('click', 'button[id^="btn_inst_edit_"]', function() {
        instruction_id = $(this).attr('id').replace("btn_inst_edit_", "");
        
        resetModInst();
        getSelectedInstruction();
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
}

function resetModInst() {
    $('#mod_inst_title').val("");
    $('.summernote').code("");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getSelectedInstruction() {
    var result = new Array();
    result = db_getInstructionByID(instruction_id);
    
    if (result.length === 1) {
        $('#mod_inst_title').val(result[0]['Title']);
        $('.summernote').code(result[0]['Instruction']);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setInstructionHTML(id) {
    var html = "<div class='row' id='instruction_id_" + id + "'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
    html += "<div class='hpanel hblue contact-panel'>";
    html += "<div class='panel-body'>";  

    html += "<div class='row'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12' style='font-weight: bold;' id='title_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<div class='row'>";
    html += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12' id='instruction_" + id + "'></div>";
    html += "</div>";
    html += "<br/>";
    html += "<p>";
    html += "<button type='button' class='btn btn-primary w-xs' data-toggle='modal' data-target='#mod_inst' id='btn_inst_edit_" + id + "'>Edit</button>";
    html += "</p>";
    
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    
    $('#instruction_list').append(html);
}

function setInstructionValues(id, titile, instruction) {   
    $('#title_' + id).html(titile);
    $('#instruction_' + id).html(instruction);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getInstructionList() {
    var result = new Array();
    result = db_getInstructionList();
    
    $('#instruction_list').empty();
    for (var i = 0; i < result.length; i++) {
        setInstructionHTML(result[i]['InstructionID']);
        setInstructionValues(result[i]['InstructionID'], result[i]['Title'], result[i]['Instruction']);
    }
    
    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addInstructionToDB(title, instruction) {
    instruction_id = db_insertInstruction(title, instruction);
    setInstructionHTML(instruction_id);
    setInstructionValues(instruction_id, title, instruction);
}

function updateInstructionToDB(title, instruction) {
    if (db_updateInstruction(instruction_id, title, instruction)) {
        setInstructionValues(instruction_id, title, instruction);
    }
}