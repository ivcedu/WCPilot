<!DOCTYPE HTML>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta http-equiv="Cache-Control" content="no-cache"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Writing Assessment</title>
        <!-- homer-1.5 Vendor css -->
        <link rel="stylesheet" href="../homer-1.5/vendor/fontawesome/css/font-awesome.css"/>
        <link rel="stylesheet" href="../homer-1.5/vendor/metisMenu/dist/metisMenu.css"/>
        <link rel="stylesheet" href="../homer-1.5/vendor/animate.css/animate.css"/>
        <link rel="stylesheet" href="../homer-1.5/vendor/bootstrap/dist/css/bootstrap.css"/>
        <link rel="stylesheet" href="../homer-1.5/vendor/sweetalert/lib/sweet-alert.css"/>
        <!-- homer-1.5 App css -->
        <link rel="stylesheet" href="../homer-1.5/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css"/>
        <link rel="stylesheet" href="../homer-1.5/fonts/pe-icon-7-stroke/css/helper.css"/>
        <link rel="stylesheet" href="../homer-1.5/styles/style.css"/>
        <!-- application css -->
    </head>
    <body>
        <div class="login-container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center m-b-md">
                        <h3 style="color: white;">Writing Assessment</h3>
                    </div>
                    <div class="hpanel">
                        <div class="panel-body">
                            <form action="#" id="loginForm">
                                <div class="form-group">
                                    <label class="control-label">Username</label>
                                    <input type="text" class="form-control" id="username">
                                    <span class="help-block small">Your network username or IVC email address</span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Password</label>
                                    <input type="password" class="form-control" id="password">
                                    <span class="help-block small">Your network password</span>
                                </div>
                                <button class="btn btn-success btn-block" id="btn_login">Login</button>
                                <div class="text-center" id="logn_error">
                                    <h4 class="font-bold" id="error_msg"></h4>
                                </div>    
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- homer-1.5 Vendor javascript -->
        <script src="../homer-1.5/vendor/jquery/dist/jquery.min.js"></script>
        <script src="../homer-1.5/vendor/jquery-ui/jquery-ui.min.js"></script>
        <script src="../homer-1.5/vendor/slimScroll/jquery.slimscroll.min.js"></script>
        <script src="../homer-1.5/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="../homer-1.5/vendor/metisMenu/dist/metisMenu.min.js"></script>
        <script src="../homer-1.5/vendor/iCheck/icheck.min.js"></script>
        <script src="../homer-1.5/vendor/sparkline/index.js"></script>
        <script src="../homer-1.5/vendor/sweetalert/lib/sweet-alert.min.js"></script>
        <!-- include javascript -->
        <script src="../include/bowser/bowser.min.js"></script>
        <script src="../include/utilities/js/jquery.backstretch.min.js"></script>
        <!-- application javascript -->
        <script src="js/login.js"></script>
        <script src="js/session_data.js"></script>
        <script src="js/db_access.js"></script>
    </body>
</html>
