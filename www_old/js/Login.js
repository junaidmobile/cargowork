
////Cargoworks - UAT service URL below
// var GHAserviceURL = 'http://13.73.167.211/GalaxyUAT/services/hhtimpservices.asmx/';
// var GHAImportFlightserviceURL = 'http://13.73.167.211/GalaxyUAT/services/hhtimpservices.asmx/';
// var GHAExportFlightserviceURL = 'http://13.73.167.211/GalaxyUAT/services/hhtexpservices.asmx/';
// var CMSserviceURL = 'http://113.193.225.52/GmaxCMSWebservice/CMS_WS_PDA.asmx/';
// var CargoWorksServiceURL = 'http://13.73.167.211/GalaxyUAT/services/hhtexpservices.asmx/';
// var ImportService = 'http://13.73.167.211/GalaxyUAT/services/hhtexpservices.asmx/';
// var baseURL = "http://52.76.76.33/galaxydemo/";
// var baseURL = "http://13.73.167.211/GalaxyUAT/";
//Commented by Shruti on 17-01-2023 for CHI work

//var baseURL = "http://13.73.167.211/GalaxyUAT/";

// commnted by Shruti on 27-02-2023 for CHI work
//var baseURL = "https://chi.kalelogistics.com/GalaxyNUE/";
//var baseURL = "https://galaxyuat.kalelogistics.com/AvinorV3/";
var baseURL = "https://chi.kalelogistics.com/Galaxyuat/";

// Commented by Shruti on 27-02-2023 for CHI work
var CMSserviceURL = 'http://113.193.225.59:8080/CHI/services/hhtexpservices.asmx/';

// //LIVE UAT URL Added by Shruti on 27-02-2023 for CHI work
// var baseURL = "http://13.73.167.211/GalaxyUAT/";

// //LIVE UAT URL Added by Shruti on 27-02-2023 for CHI work
// var CMSserviceURL = 'http://13.73.167.211/GalaxyUAT/services/hhtexpservices.asmx';

//http://104.211.164.207
var GHAserviceURL = baseURL + 'services/hhtimpservices.asmx/';
var GHAImportFlightserviceURL = baseURL + 'services/hhtimpservices.asmx/';
var GHAExportFlightserviceURL = baseURL + 'services/hhtexpservices.asmx/';
var CargoWorksServiceURL = baseURL + 'services/hhtexpservices.asmx/';
var ImportService = baseURL + 'services/hhtexpservices.asmx/';


//Commented by Shruti on 17-01-2023 for CHI work
//var CMSserviceURL = 'http://113.193.225.52/GmaxCMSWebservice/CMS_WS_PDA.asmx/';

//Cargoworks - Live service URL below  
//var GHAserviceURL = 'http://13.73.167.211/Galaxy/services/hhtimpservices.asmx/';
//var GHAImportFlightserviceURL = 'http://13.73.167.211/Galaxy/services/hhtimpservices.asmx/';
//var GHAExportFlightserviceURL = 'http://13.73.167.211/Galaxy/services/hhtexpservices.asmx/';
//var CMSserviceURL = 'http://113.193.225.52/GmaxCMSWebservice/CMS_WS_PDA.asmx/';
//var CargoWorksServiceURL = 'http://13.73.167.211/Galaxy/services/hhtexpservices.asmx/';



//WGH - UAT service URL below 
//var GHAserviceURL = 'http://13.73.167.211/wgh_uat/services/hhtimpservices.asmx/';
//var GHAImportFlightserviceURL = 'http://13.73.167.211/wgh_uat/services/hhtimpservices.asmx/';
//var GHAExportFlightserviceURL = 'http://13.73.167.211/wgh_uat/services/hhtexpservices.asmx/';
//var CMSserviceURL = 'http://113.193.225.52/GmaxCMSWebservice/CMS_WS_PDA.asmx/';
//var CargoWorksServiceURL = 'http://13.73.167.211/wgh_uat/services/hhtexpservices.asmx/';

//WGH - Live service URL below 
//var GHAserviceURL = 'http://13.73.167.211/WGH/services/hhtimpservices.asmx/';
//var GHAImportFlightserviceURL = 'http://13.73.167.211/WGH/services/hhtimpservices.asmx/';
//var GHAExportFlightserviceURL = 'http://13.73.167.211/WGH/services/hhtexpservices.asmx/';
//var CMSserviceURL = 'http://113.193.225.52/GmaxCMSWebservice/CMS_WS_PDA.asmx/';
//var CargoWorksServiceURL = 'http://13.73.167.211/WGH/services/hhtexpservices.asmx/';



document.addEventListener("deviceready", SetRememberLogin, false);
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false); //Listen to the User clicking on the back button
}

function onBackKeyDown(e) {
    e.preventDefault();
    navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
    // Prompt the user with the choice
}

function onConfirm(button) {
    if (button == 2) {//If User selected No, then we just do nothing
        return;
    } else if (button == 1) {
        navigator.app.exitApp();// Otherwise we quit the app.
    } else if (button == 0) {
        return;
        // navigator.app.exitApp();// Otherwise we quit the app.
    }
}
$(function () {
    //$(":text").addClear();
    //$(":password").addClear();
    //$('input[type=text]').addClear();
    //$('input[type=password]').addClear();
    if (typeof (MSApp) !== "undefined") {
        MSApp.execUnsafeLocalFunction(function () {
            //$('input[type=text]').addClear();
            //$('input[type=password]').addClear();
        });
    } else {
        $('input[type=text]').addClear();
        $('input[type=password]').addClear();
    }
});
function ProcessLogin() {
    //window.location = "GalaxyHome.html";
    //return;

    //window.localStorage.clear();

    var Uname = $('#txtUserName').val();
    var Pass = $('#txtPassword').val();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    if (Uname == null || Uname == "") {
        errmsg = errmsg + 'Enter User Id.<br/>';

    }
    if (Pass == null || Pass == "") {
        errmsg = errmsg + 'Enter Password.';
    }

    if (Uname != null && Uname != "" && Pass != null && Pass != "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetLoginUserDetails",
            data: JSON.stringify({ 'LoginName': Uname, 'Password': Pass }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        window.localStorage.setItem("UserID", $(this).find('Userid').text());
                        window.localStorage.setItem("UserName", $(this).find('User_Name').text());
                        window.localStorage.setItem("companyCode", $(this).find('CompanyCode').text());
                        window.localStorage.setItem("SHED_AIRPORT_CITY", $(this).find('SHED_AIRPORT_CITY').text());
                        window.localStorage.setItem("SHED_CODE", $(this).find('SHED_CODE').text());

                        window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
                        window.localStorage.setItem("GHAImportFlightserviceURL", GHAImportFlightserviceURL);
                        window.localStorage.setItem("GHAExportFlightserviceURL", GHAExportFlightserviceURL);
                        window.localStorage.setItem("CargoWorksServiceURL", CargoWorksServiceURL);
                        window.localStorage.setItem("CMSserviceURL", CMSserviceURL);
                        window.localStorage.setItem("CMSserviceURL", CMSserviceURL);
                        window.localStorage.setItem("Language", $('#ddlLanguage').find('option:selected').text());

                        window.location = "GalaxyHome.html";
                    });

                }
                else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and password.';
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                HideLoader();
                var r = jQuery.parseJSON(msg.responseText);
                alert("Message: " + r.Message);
            }
        });



        //window.location = "GalaxyHome.html";

        //if (Uname == "VENKATAS" && Pass == "123") {
        //    window.location = "GalaxyHome.html";
        //}
    }
    else if (connectionStatus == "offline") {
        HideLoader();
        $.alert('No Internet Connection!');
    }
    if (errmsg != "") {
        HideLoader();
        $.alert(errmsg);
    }
}

function RememberCheck() {
    if ($('#chkRemember').is(':checked')) {
        var UserName = $('#txtUserName').val();
        var PassWord = $('#txtPassword').val();
        window.localStorage.setItem("UserName", UserName);
        window.localStorage.setItem("Password", PassWord);
        window.localStorage.setItem("IsRememberChecked", "true");
    }
    else {
        window.localStorage.setItem("UserName", "");
        window.localStorage.setItem("Password", "");
        window.localStorage.setItem("IsRememberChecked", "false");
    }
}

function SetRememberLogin() {
    var U = window.localStorage.getItem("UserName");
    var P = window.localStorage.getItem("Password");
    var R = window.localStorage.getItem("IsRememberChecked");
    if (R != null && R == "true") {
        $('#chkRemember').prop("checked", true);
    }
    else {
        $('#chkRemember').prop("checked", false);
    }
    if (U != null && U != "") {
        $('#txtUserName').val(U);
    }
    if (P != null && P != "") {
        $('#txtPassword').val(P);
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    if (connectionStatus == 'offline') {
        $.alert('No Internet Connection!');
        setInterval(function () {
            connectionStatus = navigator.onLine ? 'online' : 'offline';
            if (connectionStatus == 'online') {
            }
            else {
                $.tips('You are offline.');
            }
        }, 3000);
    }
}

function onCreateAWB() {
    window.location = "ExpCreateAWB.html";
}
function onSearchAWB() {
    window.location = "ExpSearchAWB.html";
}
function onFlightCheck() {
    window.location = "IMP_FlightCheck.html";
}
function onIMPShipmentLoc() {
    window.location = "IMP_ShipmentLocation.html";
}
