var m_table;
var ctx;
var essay_count;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) { 
        $('#start_date').hide();
        $('#end_date').hide();
        if (!getAdminByEmail()) {
            hideSideMenu();
        }  
        getLoginInfo();
        getReaderCountList("All", "", "");
    }
    else {
        window.open('Login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
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
        
        getReaderCountList(search_option, start_date, end_date);
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_reader_essay_count').DataTable({ paging: false, bInfo: false });
    
    // Chartjs object initialize //////////////////////////////////////////////
    ctx = $("#bar_reader_count_list").get(0).getContext("2d");
    
    // bootstrap datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
});

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
function getReaderCountList(search_option, start_date, end_date) {
    var result = new Array();
    result = db_getReaderCountList(search_option, start_date, end_date);
    
    m_table.clear();
    m_table.rows.add(result).draw();
    
    drawBarChart(result);
    
    $('.animate-panel').animatePanel();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawBarChart(result) {
    var chart_labels = [];
    var data_wait_time = [];
    
    for (var i = 0; i < result.length; i++) {
        chart_labels.push(result[i]['ReaderName']);
        data_wait_time.push(result[i]['EssayCount']);
    }
    
    var barOptions = {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,0.05)",
        scaleGridLineWidth : 1,
        barShowStroke : true,
        barStrokeWidth : 2,
        barValueSpacing : 25,
        barDatasetSpacing : 1,
        responsive:true
    };
    
    var barData = {
        labels: chart_labels,
        datasets: [
            {
                label: "Essay Count",
                fillColor: "rgba(98,203,49,0.5)",
                strokeColor: "rgba(98,203,49,0.8)",
                highlightFill: "rgba(98,203,49,0.75)",
                highlightStroke: "rgba(98,203,49,1)",
                data: data_wait_time
            }
        ]
    };
    
    if (essay_count !== undefined) {
        essay_count.destroy();
    }

    essay_count = new Chart(ctx).Bar(barData, barOptions);
}