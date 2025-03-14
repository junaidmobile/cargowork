﻿
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");
var ImportService = window.localStorage.getItem("ImportService");
var GHAserviceURL = window.localStorage.getItem("GHAserviceURL");

var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var FlightSeqNo;
var SEQ_NO = "";
var ActNop;
var ActWt;

var FoundActPcs;
var FoundActWt;

var DamageHouseSeqNo = "";
var DamageShipNo = ""


$(function () {

    document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);

    var language = window.localStorage.getItem("Language");

    switch (language) {
        case "English":
            //setEnglish();
            break;
        case "German":
            setGerman();
            break;
        case "Russian":
            setRussian();
            break;
        case "Turkish":
            setTurkish();
            break;
    }

    BindMultiDropDown('111', '11111111', '0', '0');

});

function setEnglish() {
    //$('#lblUnitization').text("Unitization");  
}

function setGerman() {
    $('#lblAwbNo').text("AWB Nr.");
    $('#lblFlightNo').text("Flugnummer");
    $('#lblHAWB').text("HAWB Nr.");
    $('#lblPieces').text("Stückzahl");
    $('#lblWeight').text("Gewicht");
    $('#lblDmgRecordedAt').text("Feststellung des Schadens");
    $('#lblTypPackaging').text("Art der Verpackung");
    $('#lblTypContainer').text("Art der Umverpackung");
    $('#lblTypPackMaterial').text("Art des Verpackungsmaterials");
    $('#lblTypPackDamage').text("Art der Verpackungsbeschädigung");
    $('#lblTypDamageContent').text("Art der Inhaltsbeschädigung");
    $('#lblAaparentDamage').text("Begründung der Beschädigung");
    $('#lblFurtherHandle').text("Weitere Abfertigung");
    $('#lblDamfirstnotice').text("Zeitpunkt der Schadensfeststellung");
    $('#lblMarksLabels').text("Packstückmarkierungen");

    $('#lblDisposition').text("Anordnung");
    $('#lblInnerPacking').text("Innere Verpackung");

    $('#lblTheftSigns').text("Anzeichen von Diebstahl");
    $('#lblRemarks').text("Bemerkungen");
    $('#lblUploadDoc').text("Hochladen des Dokuments");
    $('#cameraTakePicture').val("Hochladen");
    $('#btnExit').val("Exit");
    $('#btnSubmit').val("Senden");

}

function setRussian() {
    $('#lblAwbNo').text("номер авианакладной");
    $('#lblFlightNo').text("номер рейса");
    $('#lblHAWB').text("номер HAWB");
    $('#lblPieces').text("количество");
    $('#lblWeight').text("вес");
    $('#lblDmgRecordedAt').text("обнаружениe недостачи груза");
    $('#lblTypPackaging').text("вид упаковки");
    $('#lblTypContainer').text("вид контейнера");
    $('#lblTypPackMaterial').text("вид упаковочного материала");
    $('#lblTypPackDamage').text("вид упаковочного материала");
    $('#lblTypDamageContent').text("Описание повреждения содержимого ");
    $('#lblAaparentDamage').text("Причины порчи груза");
    $('#lblFurtherHandle').text("дальнейшая обработка");
    $('#lblDamfirstnotice').text("время обнаружения недостачи груза");
    $('#lblMarksLabels').text("маркировки");
    
    $('#lblDisposition').text("Расположение");
    $('#lblInnerPacking').text("Внутренняя упаковка");

    $('#lblTheftSigns').text("Подозрение на кражу ");
    $('#lblRemarks').text("дополнительная информация");
    $('#lblUploadDoc').text("загрузить документ");
    $('#cameraTakePicture').val("загрузить");
    $('#btnExit').val("выход");
    $('#btnSubmit').val("отправить");
}

function setTurkish() {
    //$('#lblAwbNo').text("AWB Numarasi");    
    $('#lblFlightNo').text("Ucus Numarasi");
    //$('#lblHAWB').text("Ucus Numarasi");
    $('#lblPieces').text("Paket Adedi");
    $('#lblWeight').text("Agirlik");
    $('#lblDmgRecordedAt').text("Hasar Kayit Zamani");
    $('#lblTypPackaging').text("Paket Tipi");
    $('#lblTypContainer').text("Kontaeynir Tipi");
    $('#lblTypPackMaterial').text("Paket Malzeme Tipi ");
    $('#lblTypPackDamage').text("Ambalajin Hasar türü");
    $('#lblTypDamageContent').text("Hasarli Icerik türü");
    $('#lblAaparentDamage').text("Hasar Sebei");
    $('#lblFurtherHandle').text("Ileri Ellecleme");
    $('#lblDamfirstnotice').text("Ilk Ihbar ");
    $('#lblMarksLabels').text("Isaretlemeler ve Etiketler");

    $('#lblDisposition').text("Eğilim");
    $('#lblInnerPacking').text("İç ambalaj");

    $('#lblTheftSigns').text("Hirsizlik Belirtisi");
    $('#lblRemarks').text("Uyarilar");
    $('#lblUploadDoc').text("Evraklarin Sisteme Yüklemek");
    $('#cameraTakePicture').val("Sisteme Yüklemek");
    $('#btnExit').val("Cikis");
    $('#btnSubmit').val("Teslim Etmek");
}


function BindMultiDropDown(AWBPREFIX, AWBNumber, HAWBSeqNo, BindShipNo) {

    FlightSeqNo = '0';

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    var inputXML = '<Root><AWBPref>' + AWBPREFIX + '</AWBPref><AWBNo>' + AWBNumber + '</AWBNo><HouseSeqNo></HouseSeqNo><ShipNo>' + BindShipNo + '</ShipNo><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><Module>Imports</Module><CompanyCode>' + window.localStorage.getItem("companyCode") + '</CompanyCode><AirportCity>' + AirportCity + '</AirportCity><Save_From>A</Save_From></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            //url: GHAImportFlightserviceURL + "IMPCreateInCheckManifest",
            url: GHAImportFlightserviceURL + "HHTGetDamageDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                $('#divDamageShowGrid').empty();
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);


                $("#packagingtype").empty();
                $("#containertype").empty();
                $("#material").empty();
                $("#damagetype").empty();
                $("#damagecontent").empty();
                $("#damagecause").empty();
                $("#handling").empty();
                $("#damagenotice").empty();
                $("#markslabels").empty();

                $("#disposition").empty();
                $("#innerpacking").empty();

                $(xmlDoc).find('Table1').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    //$("#packagingtype").append('<option value=option5>Option 5</option>');
                    if (isSelected == "Y") {
                        $("#packagingtype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        //$("#packagingtype option[value='" + RId + "']").prop("selected", false);
                        //$("#packagingtype option[value='" + RId + "']:selected").prop("selected", false);
                        $("#packagingtype").append('<option value=' + RId + ' class="deselectopt">' + Desc + '</option>');
                    }
                    //$("#packagingtype").multiselect('refresh');
                });

                //BindDamagePackaging();


                $(xmlDoc).find('Table2').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#containertype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#containertype").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#containertype").multiselect('refresh');
                });
                //BindDamageContainerType();


                $(xmlDoc).find('Table3').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#material").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#material").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#material").multiselect('refresh');
                });
                //BindDamageMaterial();


                $(xmlDoc).find('Table6').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagetype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagetype").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagetype").multiselect('refresh');
                });
                //BindDamageType();


                $(xmlDoc).find('Table7').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagecontent").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagecontent").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagecontent").multiselect('refresh');
                });
                //BindDamageContent();


                $(xmlDoc).find('Table9').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagecause").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagecause").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagecause").multiselect('refresh');
                });
                //BindDamageCause();  


                $(xmlDoc).find('Table10').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#handling").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#handling").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#handling").multiselect('refresh');
                });
                //BindDamageHandling();


                $(xmlDoc).find('Table8').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagenotice").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagenotice").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagenotice").multiselect('refresh');
                });
                //BindDamageNotice();


                $(xmlDoc).find('Table4').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#markslabels").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#markslabels").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#markslabels").multiselect('refresh');
                });

                $(xmlDoc).find('Table11').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#disposition").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#disposition").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                });


                $(xmlDoc).find('Table5').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#innerpacking").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#innerpacking").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                });


                //BindDamageLabels();

                $(xmlDoc).find('Table14').each(function () {
                    var signsoftheft = "";
                    $('#txtDamRemarks').val($(this).find('REMARKS').text());
                    signsoftheft = $(this).find('DAMAGE_EVIDENCE_PILFERAGE').text()

                    if (signsoftheft == "Y") {
                        $("#chkYes").prop('checked', true);
                        $("#chkNo").prop('checked', false);
                    }
                    else {
                        $("#chkYes").prop('checked', false);
                        $("#chkNo").prop('checked', true);
                    }
                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });

    }
}

function ChkAndValidate() {

    var ScanCode = $('#txtAWBNo').val();
    ScanCode = ScanCode.replace(/\s+/g, '');
    ScanCode = ScanCode.replace("-", "").replace("–", "");

    if (ScanCode.length >= 11) {
        $("#ddlFlightNo").empty();
        $("#ddlHAWB").empty();
        $('#txtPieces').val('');
        $('#txtWeight').val('');
        GetAWBDetails('0');
    }
}

function GetAWBDetails(mode) {
    var BindShipNo;
    var DamageHouseSeqNo, FlightSeqNo;
    var flightSeqNumber = $('#ddlFlightNo').find('option:selected').val();
    var DamageRecordStatus = $('#ddlDmgRecordedAt').find('option:selected').val();
    var tempHawbSeqNo = $('#ddlHAWB').find('option:selected').val();
    if (mode == '0') {
        FlightSeqNo = "0";
        BindShipNo = "0";
        DamageHouseSeqNo = "0";
        $('#ddlHAWB').empty();
    } else if (mode == 'F') {
        var splitVal = flightSeqNumber.split("_");
        FlightSeqNo = splitVal[0];
        BindShipNo = splitVal[1];
        DamageHouseSeqNo = "0";
        $('#ddlHAWB').empty();
    } else if (mode == 'H') {
        var splitVal = flightSeqNumber.split("_");
        FlightSeqNo = splitVal[0];
        var HAWBSplitval = tempHawbSeqNo.split("_");
        DamageHouseSeqNo = HAWBSplitval[0];
        BindShipNo = HAWBSplitval[1];
    } else {
        var splitVal = flightSeqNumber.split("_");
        FlightSeqNo = splitVal[0];
        if (tempHawbSeqNo == undefined) {
            DamageHouseSeqNo = "0";
            BindShipNo = splitVal[1];
        } else {
            var HAWBSplitval = tempHawbSeqNo.split("_");
            DamageHouseSeqNo = HAWBSplitval[0];
            BindShipNo = HAWBSplitval[1];
        }
    }
    $('#txtDamRemarks').val('');
    $("#chkYes").prop('checked', true);
    $("#chkNo").prop('checked', false);

    // if (flightSeqNumber == undefined) {
    //     FlightSeqNo = "0";
    //     BindShipNo = "0";
    // } else {
    //     var splitVal = flightSeqNumber.split("_");
    //     FlightSeqNo = splitVal[0];
    //     BindShipNo = splitVal[1];
    // }


    // var tempHawbSeqNo = $('#ddlHAWB').find('option:selected').val();
    // if (tempHawbSeqNo == undefined) {
    //     DamageHouseSeqNo = "0";
    // } else {
    //     var splitVal = tempHawbSeqNo.split("_");
    //     DamageHouseSeqNo = splitVal[0];
    // }

    // $("#ddlFlightNo").empty();
    // $("#ddlHAWB").empty();
    // $('#txtPieces').val('');
    // $('#txtWeight').val('');


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    var saveFrom = "A";
    var MAWBNo = $('#txtAWBNo').val();

    if (MAWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if (DamageRecordStatus == 'A' || DamageRecordStatus == 'D') {
        saveFrom = DamageRecordStatus;
    } else {
        saveFrom = "A";
    }
    var inputXML = '<Root><AWBPref>' + MAWBNo.substring(0, 3) + '</AWBPref><AWBNo>' + MAWBNo.substring(3, 11) + '</AWBNo><HouseSeqNo>' + DamageHouseSeqNo + '</HouseSeqNo><ShipNo>' + BindShipNo + '</ShipNo><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><Module>Imports</Module><CompanyCode>' + window.localStorage.getItem("companyCode") + '</CompanyCode><AirportCity>' + AirportCity + '</AirportCity><Save_From>' + saveFrom + '</Save_From></Root>';
    var isValidNumber = true;
    console.log(JSON.stringify({ 'InputXML': inputXML }));

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            //url: GHAImportFlightserviceURL + "IMPCreateInCheckManifest",
            url: GHAImportFlightserviceURL + "HHTGetDamageDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                console.log('Result ', Result)
                $('#divDamageShowGrid').empty();

                Result = Result.d;
                var xmlDoc = $.parseXML(Result);

                isValidNumber = true;

                $(xmlDoc).find('Table1').each(function (index) {

                    console.log($(this).find('Status').text());
                    console.log($(this).find('StrMessage').text());

                    var vrStatus = $(this).find('Status').text();

                    if (vrStatus == "E") {
                        isValidNumber = false;
                        var r = $(this).find('StrMessage').text();
                        r = r.replace("Error:", "");
                        $.alert(r);
                        return;
                    }
                });

                if (isValidNumber == true) {

                    $(xmlDoc).find('Table').each(function () {

                        $('#txtPieces').val($(this).find('NPR').text());
                        $('#txtWeight').val($(this).find('WtRec').text());

                    });

                    $(xmlDoc).find('Table16').each(function () {

                        var flightNo;
                        var flightSeqNo;

                        flightNo = $(this).find('FltDet').text();
                        flightSeqNo = $(this).find('Value').text();
                        if (flightNo != "") {
                            var newOption = $('<option></option>');
                            newOption.val(flightSeqNo).text(flightNo);
                            newOption.appendTo('#ddlFlightNo');
                        } else {
                            var hAWBNo;
                            var hAWBSeqNo;
                            hAWBNo = $(this).find('HOUSE_NUMBER').text();
                            hAWBSeqNo = $(this).find('Value').text();

                            var newOption = $('<option></option>');
                            newOption.val(hAWBSeqNo).text(hAWBNo);
                            newOption.appendTo('#ddlHAWB');
                        }

                    });

                    $(xmlDoc).find('Table17').each(function () {

                        var hAWBNo;
                        var hAWBSeqNo;

                        hAWBNo = $(this).find('HOUSE_NUMBER').text();
                        hAWBSeqNo = $(this).find('Value').text();

                        var newOption = $('<option></option>');
                        newOption.val(hAWBSeqNo).text(hAWBNo);
                        newOption.appendTo('#ddlHAWB');
                    });


                    $("#packagingtype").empty();
                    $("#containertype").empty();
                    $("#material").empty();
                    $("#damagetype").empty();
                    $("#damagecontent").empty();
                    $("#damagecause").empty();
                    $("#handling").empty();
                    $("#damagenotice").empty();
                    $("#markslabels").empty();

                $("#disposition").empty();
                $("#innerpacking").empty();

                    $(xmlDoc).find('Table1').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        //$("#packagingtype").append('<option value=option5>Option 5</option>');
                        if (isSelected == "Y") {
                            $("#packagingtype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            //$("#packagingtype option[value='" + RId + "']").prop("selected", false);
                            //$("#packagingtype option[value='" + RId + "']:selected").prop("selected", false);
                            $("#packagingtype").append('<option value=' + RId + ' class="deselectopt">' + Desc + '</option>');
                        }
                        //$("#packagingtype").multiselect('refresh');
                    });

                    //BindDamagePackaging();


                    $(xmlDoc).find('Table2').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#containertype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#containertype").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#containertype").multiselect('refresh');
                    });
                    //BindDamageContainerType();


                    $(xmlDoc).find('Table3').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#material").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#material").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#material").multiselect('refresh');
                    });
                    //BindDamageMaterial();


                    $(xmlDoc).find('Table6').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#damagetype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#damagetype").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#damagetype").multiselect('refresh');
                    });
                    //BindDamageType();


                    $(xmlDoc).find('Table7').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#damagecontent").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#damagecontent").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#damagecontent").multiselect('refresh');
                    });
                    //BindDamageContent();


                    $(xmlDoc).find('Table9').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#damagecause").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#damagecause").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#damagecause").multiselect('refresh');
                    });
                    //BindDamageCause();  


                    $(xmlDoc).find('Table10').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#handling").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#handling").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#handling").multiselect('refresh');
                    });
                    //BindDamageHandling();



                    $(xmlDoc).find('Table8').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#damagenotice").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#damagenotice").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#damagenotice").multiselect('refresh');
                    });
                    //BindDamageNotice();


                    $(xmlDoc).find('Table4').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();

                        if (isSelected == "Y") {
                            $("#markslabels").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#markslabels").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                        //$("#markslabels").multiselect('refresh');
                    });
         
                    $(xmlDoc).find('Table11').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();
    
                        if (isSelected == "Y") {
                            $("#disposition").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#disposition").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                    });
    
    
                    $(xmlDoc).find('Table5').each(function (index) {
                        var RId = $(this).find('RId').text();
                        var Desc = $(this).find('RDes').text();
                        var isSelected = $(this).find('IsSel').text();
    
                        if (isSelected == "Y") {
                            $("#innerpacking").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                        }
                        else {
                            $("#innerpacking").append('<option value=' + RId + '>' + Desc + '</option>');
                        }
                    });

                    $(xmlDoc).find('Table14').each(function () {
                        var signsoftheft = "";
                        $('#txtDamRemarks').val($(this).find('REMARKS').text());
                        signsoftheft = $(this).find('DAMAGE_EVIDENCE_PILFERAGE').text()

                        if (signsoftheft == "Y") {
                            $("#chkYes").prop('checked', true);
                            $("#chkNo").prop('checked', false);
                        }
                        else {
                            $("#chkYes").prop('checked', false);
                            $("#chkNo").prop('checked', true);
                        }
                    });
                }
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });

    }
}

function GetHAWBDetails(hawbId) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var BindShipNo = 0;
    var MAWBNo = $('#txtAWBNo').val();

    if (MAWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    var tempFlightSeqNo = $('#ddlFlightNo').find('option:selected').val().split("_");
    var tempHawbSeqNo = hawbId.split("_");

    DamageHouseSeqNo = tempHawbSeqNo[0];
    FlightSeqNo = tempFlightSeqNo[0];
    BindShipNo = tempHawbSeqNo[1];



    var inputXML = '<Root><AWBPref>' + MAWBNo.substring(0, 3) + '</AWBPref><AWBNo>' + MAWBNo.substring(3, 11) + '</AWBNo><HouseSeqNo>' + DamageHouseSeqNo + '</HouseSeqNo><ShipNo>' + BindShipNo + '</ShipNo><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><Module>Imports</Module><CompanyCode>' + window.localStorage.getItem("companyCode") + '</CompanyCode><AirportCity>' + AirportCity + '</AirportCity><Save_From>A</Save_From></Root>';

    console.log(JSON.stringify({ 'InputXML': inputXML }));
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            //url: GHAImportFlightserviceURL + "IMPCreateInCheckManifest",
            url: GHAImportFlightserviceURL + "HHTGetDamageDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                $('#divDamageShowGrid').empty();
                Result = Result.d;
                var xmlDoc = $.parseXML(Result);


                $("#packagingtype").empty();
                $("#containertype").empty();
                $("#material").empty();
                $("#damagetype").empty();
                $("#damagecontent").empty();
                $("#damagecause").empty();
                $("#handling").empty();
                $("#damagenotice").empty();
                $("#markslabels").empty();

                $("#disposition").empty();
                $("#innerpacking").empty();

                $(xmlDoc).find('Table1').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    //$("#packagingtype").append('<option value=option5>Option 5</option>');
                    if (isSelected == "Y") {
                        $("#packagingtype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        //$("#packagingtype option[value='" + RId + "']").prop("selected", false);
                        //$("#packagingtype option[value='" + RId + "']:selected").prop("selected", false);
                        $("#packagingtype").append('<option value=' + RId + ' class="deselectopt">' + Desc + '</option>');
                    }
                    //$("#packagingtype").multiselect('refresh');
                });

                //BindDamagePackaging();


                $(xmlDoc).find('Table2').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#containertype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#containertype").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#containertype").multiselect('refresh');
                });
                //BindDamageContainerType();


                $(xmlDoc).find('Table3').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#material").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#material").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#material").multiselect('refresh');
                });
                //BindDamageMaterial();


                $(xmlDoc).find('Table6').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagetype").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagetype").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagetype").multiselect('refresh');
                });
                //BindDamageType();


                $(xmlDoc).find('Table7').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagecontent").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagecontent").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagecontent").multiselect('refresh');
                });
                //BindDamageContent();


                $(xmlDoc).find('Table9').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagecause").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagecause").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagecause").multiselect('refresh');
                });
                //BindDamageCause();  


                $(xmlDoc).find('Table10').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#handling").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#handling").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#handling").multiselect('refresh');
                });
                //BindDamageHandling();


                $(xmlDoc).find('Table8').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#damagenotice").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#damagenotice").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#damagenotice").multiselect('refresh');
                });
                //BindDamageNotice();


                $(xmlDoc).find('Table4').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#markslabels").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#markslabels").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                    //$("#markslabels").multiselect('refresh');
                });

                $(xmlDoc).find('Table14').each(function () {
                    var signsoftheft = "";
                    $('#txtDamRemarks').val($(this).find('REMARKS').text());
                    signsoftheft = $(this).find('DAMAGE_EVIDENCE_PILFERAGE').text()

                    if (signsoftheft == "Y") {
                        $("#chkYes").prop('checked', true);
                        $("#chkNo").prop('checked', false);
                    }
                    else {
                        $("#chkYes").prop('checked', false);
                        $("#chkNo").prop('checked', true);
                    }
                });

                $(xmlDoc).find('Table11').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#disposition").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#disposition").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                });

                $(xmlDoc).find('Table5').each(function (index) {
                    var RId = $(this).find('RId').text();
                    var Desc = $(this).find('RDes').text();
                    var isSelected = $(this).find('IsSel').text();

                    if (isSelected == "Y") {
                        $("#innerpacking").append('<option value=' + RId + ' selected=selected>' + Desc + '</option>');
                    }
                    else {
                        $("#innerpacking").append('<option value=' + RId + '>' + Desc + '</option>');
                    }
                });
                //BindDamageLabels();

                //$("#theftsign").append('<option value=Y>Yes</option>');
                //$("#theftsign").append('<option value=N>No</option>');
                //$("#theftsign").multiselect('refresh');
                //BindTheftSigns();

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });

    }
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function SaveDamageDetails() {

    var MAWBNo = $('#txtAWBNo').val();

    if (MAWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if ($('#txtPieces').val() == '') {
        errmsg = "Please enter pieces";
        $.alert(errmsg);
        return;
    }

    if ($('#txtWeight').val() == '') {
        errmsg = "Please enter weight";
        $.alert(errmsg);
        return;
    }

    if ($('#ddlHAWB').find('option:selected').text() == '') {
        var tempFlightSeqNo = $('#ddlFlightNo').find('option:selected').val().split("_");

        FlightSeqNo = tempFlightSeqNo[0];
        DamageHouseSeqNo = '0';
        DamageShipNo = tempFlightSeqNo[1];
    }
    else {
        var tempFlightSeqNo = $('#ddlFlightNo').find('option:selected').val().split("_");
        var tempHawbSeqNo = $('#ddlHAWB').find('option:selected').val().split("_");

        FlightSeqNo = tempFlightSeqNo[0];
        DamageHouseSeqNo = tempHawbSeqNo[0];
        DamageShipNo = tempHawbSeqNo[1];
    }




    var packagingtype = "";
    var containertype = "";
    var material = "";
    var damagetype = "";
    var damagecontent = "";
    var damagecause = "";
    var furtherhandling = "";
    var damagenotice = "";
    var marksnlabels = "";
    var signsoftheft = "";

    var disposition = "";
    var innerpacking = "";

    if (document.getElementById('chkYes').checked) {
        signsoftheft = 'Y';
    } else if (document.getElementById('chkNo').checked) {
        signsoftheft = 'N';
    }

    packagingtype = getSelectValues(document.getElementById('packagingtype'));
    containertype = getSelectValues(document.getElementById('containertype'));
    material = getSelectValues(document.getElementById('material'));
    damagetype = getSelectValues(document.getElementById('damagetype'));
    damagecontent = getSelectValues(document.getElementById('damagecontent'));
    damagecause = getSelectValues(document.getElementById('damagecause'));
    furtherhandling = getSelectValues(document.getElementById('handling'));
    damagenotice = getSelectValues(document.getElementById('damagenotice'));
    marksnlabels = getSelectValues(document.getElementById('markslabels'));

    disposition = getSelectValues(document.getElementById('disposition'));
    innerpacking = getSelectValues(document.getElementById('innerpacking'));

    //signsoftheft = getSelectValues(document.getElementById('theftsign'));

    //<ROOT><DamageData  AWBNo='65555125' HouseSeqNo='0' AwbPrefix='117' FlightSeqNumber='2315' ShipmentNo='1' AirportCity='OSL' CompanyCode='3' CreatedBy='252' ContainerMaterial='BAL,HOL,HOZ' ContainerType='' OuterPacking='AND,FOL' MarksLabels='DGR,GLA' InnerPacking='CRD,CSM' IsSufficient='Y' Container='' Containers='' DamageDiscovered='' SpaceForMissing='N' VerifiedInvoice='N' AparentCause='' WeatherCondation='' DamageRemarked='' EvidencePilferage='Y' Remarks='DS1' Salvage='' Disposition='' TypeDiscripency='DMG' TotalWTShippedAWB='0' TotalPcsShippedAWB='0' TotalWTActual='100' TotalPcsActual='10' TotalWTDifference='0' TotalPcsDifference='0' IndividualWTPerDoc='0' IndividualWTActChk='0' IndividualWTDifference='0'  Save_From='A' /></ROOT> ,''

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputxml = '<ROOT><DamageData  AWBNo="' + MAWBNo.substring(3, 11) + '" HouseSeqNo="' + DamageHouseSeqNo + '" AwbPrefix="' + MAWBNo.substring(0, 3) + '" FlightSeqNumber="' + FlightSeqNo + '" ShipmentNo="' + DamageShipNo + '" AirportCity="' + AirportCity + '" CompanyCode="' + window.localStorage.getItem("companyCode") + '" CreatedBy="' + window.localStorage.getItem("UserID") + '" ContainerMaterial="' + packagingtype + '" ContainerType="' + containertype + '" OuterPacking="' + material + '" MarksLabels="' + marksnlabels + '" InnerPacking="' + innerpacking + '"  IsSufficient="Y" Container="' + damagetype + '" Containers="' + damagecontent + '" DamageDiscovered="' + damagenotice + '" SpaceForMissing="N" VerifiedInvoice="N" AparentCause="' + damagecause + '" WeatherCondation="" DamageRemarked="" EvidencePilferage="' + signsoftheft + '" Remarks="' + $('#txtDamRemarks').val() + '" Salvage="' + furtherhandling + '" Disposition="' + disposition + '"  TypeDiscripency="DMG" TotalWTShippedAWB="0" TotalPcsShippedAWB="0" TotalWTActual="' + $('#txtWeight').val() + '" TotalPcsActual="' + $('#txtPieces').val() + '" TotalWTDifference="0" TotalPcsDifference="0" IndividualWTPerDoc="0" IndividualWTActChk="0" IndividualWTDifference="0"  Save_From="' + $('#ddlDmgRecordedAt').find('option:selected').val() + '" /></ROOT>';
    //var inputXML = '<Root><SEQ_NO>' + SEQ_NO + '</SEQ_NO><MATERIAL_FOR>U</MATERIAL_FOR><MATERIAL_ID>' + $('#ddlMaterialType').find('option:selected').val() + '</MATERIAL_ID><MATERIAL_UNIT>' + $('#txtNoUnits').val() + '</MATERIAL_UNIT><Module>I</Module><ULDSeqNo>' + $('#ddlULDNo').find('option:selected').val() + '</ULDSeqNo><FLTSeqNo>' + FlightSeqNo + '</FLTSeqNo><AirportCity>' + AirportCity + '</AirportCity><CompanyCode>' + window.localStorage.getItem("companyCode") + '</CompanyCode><UserID>' + window.localStorage.getItem("UserID") + '</UserID></Root>';


    console.log("this is main save function");
    console.log(JSON.stringify({
        'InputXML': inputxml,
    }));

    if (imageDataForArray.length > 0) {
        ImagesXmlGen = '<FileData>';
        var ImagesXmlGen1 = '<FileData>';

        for (var n = 0; n < imageDataForArray.length; n++) {
            var j = n + 1;
            var fileNAme = "TLogo" + j.toString();
            ImagesXmlGen += "<Img FileName=" + '"' + fileNAme + '"'
                + " FileExtention= " + '"jpg"'
                + " Image= " + '"' + imageDataForArray[n] + '" ></Img>';
        }

        for (var n = 0; n < imageDataForArray.length; n++) {
            var j = n + 1;
            var fileNAme = "TLogo" + j.toString();
            ImagesXmlGen1 += "<Img FileName=" + '"' + fileNAme + '"'
                + " FileExtention= " + '"jpg"'
                + " Image= " + '"' + n.toString() + '" ></Img>';
        }

        ImagesXmlGen += "</FileData>";
        ImagesXmlGen1 += "</FileData>";

        // console.log(ImagesXmlGen);
        // console.log(ImagesXmlGen1);

        var inputxml1 = '<ROOT><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><FlightSeqNo>0</FlightSeqNo><AWBPrefix>'
            + MAWBNo.substring(0, 3) + '</AWBPrefix><Type>E</Type><AWBNo>' + MAWBNo.substring(3, MAWBNo.length)
            + '</AWBNo><ULDId>-1</ULDId><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></ROOT>';


        console.log("this is child save function");

        console.log(JSON.stringify({
            'InputXML': inputxml1, 'InputImage': ImagesXmlGen1,
        }));


    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "HHTSaveDamageDetails",
            data: JSON.stringify({ 'DamageXML': inputxml, 'Mode': "Imports" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table1').each(function () {
                    if ($(this).find('Status').text() == 'S') {

                        console.log("success - this is main save function");


                        $.alert($(this).find('Message').text());
                        if (imageDataForArray.length > 0) {
                            console.log("success - imageDataForArray.length > 0");
                            $.ajax({
                                type: "POST",
                                url: GHAserviceURL + "SaveFileUploadDetails",
                                data: JSON.stringify({
                                    'InputXML': inputxml1, 'InputImage': ImagesXmlGen,
                                }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                beforeSend: function doStuff() {

                                    $('body').mLoading({
                                        text: "Please Wait..Uploading images..",
                                    });
                                },
                                success: function (response1) {
                                    console.log("success - SaveFileUploadDetails");
                                    var parser1, xmlDoc1;
                                    $("body").mLoading('hide');

                                    imageDataForArray = [];
                                    ImagesXmlGen = '';
                                    inputxml1 = '';
                                    $('#divImages').empty();
                                    
                                    parser1 = new DOMParser();
                                    xmlDoc1 = parser1.parseFromString(response1.d, "text/xml");
                                    var msg1 = xmlDoc1.getElementsByTagName("StrMessage")[0].childNodes[0].nodeValue;
                                    $.alert(msg1);

                                    imageDataForArray = [];
                                    ImagesXmlGen = '';
                                    inputxml1 = '';
                                    $('#divImages').empty();

                                    $("#cameraTakePicture").removeAttr('disabled');
                                    // ClearAWBDetails();
                                    // clearALL();
                                    ClearAllData();
                                },
                                error: function (msg) {
                                    $("body").mLoading('hide');
                                    console.log(msg);

                                }
                            });

                        }



                    }
                    if ($(this).find('Status').text() == 'E') {
                        $.alert($(this).find('Message').text());
                    }
                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
                //$.alert('Details saved successfully');
            }
        });
        return false;
    }

}

function ClearAllData() {
 


    $('#txtAWBNo').val('');
    $('#txtPieces').val('');
    $('#txtWeight').val('');

    $("#packagingtype").empty();
    $("#containertype").empty();
    $("#material").empty();
    $("#damagetype").empty();
    $("#damagecontent").empty();
    $("#damagecause").empty();
    $("#handling").empty();
    $("#damagenotice").empty();
    $("#markslabels").empty();

    
    $("#disposition").empty();
    $("#innerpacking").empty();

    $("#ddlFlightNo").empty();
    $("#ddlHAWB").empty();

    $('#txtDamRemarks').val('');

    $('#packagingtype').val('');
    $('#containertype').val('');
    $('#material').val('');
    $('#damagetype').val('');
    $('#damagecontent').val('');
    $('#damagecause').val('');
    $('#handling').val('');
    $('#damagenotice').val('');
    $('#markslabels').val('');

    $('#txtIGMNo').val('');
    $('#txtIGMYear').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#txtTotCnts').val('');
    $('#txtManiPieces').val('');
    $('#txtReceivePieces').val('');
    $('#txtManiGrWt').val('');
    $('#txtReceiveGrWt').val('');
    $('#txtShortPieces').val('');
    $('#txtExcessPieces').val('');
    $('#txtDamagePieces').val('');

    $('#txtAWBPrefix').val('');
   
    $('#txtPackages').val('');
    $('#txtWeight_FC').val('');
    $('#txtLocation_FC').val('');
    $('#txtOrigin_FC').val('');
    $('#txtDestination_FC').val('')

    $("#disposition").val('');
    $("#innerpacking").val('');
    

    
    $("#cameraTakePicture").removeAttr('disabled');

    $("#chkYes").prop('checked', false);
    $("#chkNo").prop('checked', false);
}

function cameraTakePictureOLD() {
    navigator.camera.getPicture(onSuccess, onFail, {
        //quality: 100,
        //encodingType: 0,
        //targetWidth: 500,
        //targetHeight: 500,
        //destinationType: Camera.DestinationType.DATA_URL
        quality: 100,
        encodingType: Camera.EncodingType.JPEG,
        //allowEdit: true,
        //correctOrientation: true,
        targetWidth: 250,
        targetHeight: 250,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        //var image = document.getElementById('myImage');
        //var data = "data:image/jpeg;base64," + imageData;
        SaveUploadFile(imageData);
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function SaveUploadFileOLD(imageData) {

    var MAWBNo = $('#txtAWBNo').val();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (imageData == "") {

        errmsg = "Some error occurred.</br>Please try again.";
        $.alert(errmsg);
        return;

    }


    inputxml = '<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>' + $('#txtDamRemarks').val() + '</Description><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><AWBPrefix>' + MAWBNo.substr(0, 3) + '</AWBPrefix><Type>I</Type><AWBNo>' + MAWBNo.substr(3, 8) + '</AWBNo><ULDId>0</ULDId><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';


    //inputxml = '<Root><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><Description>' + $('#txtDescription').val() + '</Description><FlightSeqNo>' + flightSeqNo + '</FlightSeqNo><UShipRowId>' + UShipRowId + '</UShipRowId><Type>I</Type><UAWBRowId>' + UAWBRowId + '</UAWBRowId><ULDId>-1</ULDId><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "SaveFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml, 'InputImage': imageData,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var res = response.d
                var xmlDoc = $.parseXML(res);

                $(xmlDoc).find('Table').each(function () {
                    if ($(this).find('Status').text() == 'S') {
                        $.alert($(this).find('StrMessage').text());
                    }
                });
                //window.location.reload();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}


var imageDataForArray = new Array();
function cameraTakePicture() {

    // if (imageDataForArray.length == 3) {
    //     errmsg = "Only 10 Images can be uploaded";
    //     $.alert(errmsg);
    //     return;
    // }

    navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL, //DATA_URL , FILE_URI
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true,
        correctOrientation: true,


    });
}


function onSuccess(imageData) {
    var data = "data:image/jpeg;base64," + imageData;
    imgDataForSave = imageData;
    imageDataForArray.push(imgDataForSave);
    htmlImages = '';
    htmlImages += '<div class="form-group col-xs-4 col-sm-6 col-md-6" style="margin-top:20px;">';
    htmlImages += '<img id="myImage" src="' + data + '" height="100" width="100" style="display:block;" />';
    htmlImages += '</div>';

    $('#divImages').append(htmlImages);
    if (imageDataForArray.length == 10) {
        $("#cameraTakePicture").attr('disabled', 'disabled');
    }
    console.log(imageDataForArray);

}

function onFail(message) {
    alert('Failed because: ' + message);
}

function AllImages(imageDataForArray) {
    ImagesXmlGen = '<FileData>';
    for (var n = 0; n < imageDataForArray.length; n++) {
        var j = n + 1;
        ImagesXmlGen += "<Img FileName=" + "TLogo1" + j.toString() + " FileExtension= " + "jpg" + " Image=" + imageDataForArray[n] + " > </Img>";
    }
    ImagesXmlGen += "</FileData>";

    return ImagesXmlGen;

}


function SaveUploadFile() {



    var MAWBNo = $('#txtAWBNo').val().toString().trim();

    if (MAWBNo == "") {

        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    if (MAWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if (imageDataForArray.length == 0) {
        errmsg = "Enter atleast one image";
        $.alert(errmsg);
        return;
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var awbExist = true;

    inputxml = '<Root><AWBNo>' + MAWBNo + '</AWBNo><HouseNo></HouseNo><AirportCity>' + AirportCity + '</AirportCity><Type>E</Type></Root>';

    console.log("this is main save function");
    console.log(JSON.stringify({
        'InputXML': inputxml,
    }));


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAserviceURL + "GetFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                console.log("sucess this is main save function");
                // console.log(JSON.stringify({
                //     'InputXML': inputxml,
                // }));

                console.log(xmlDoc);

                $(xmlDoc).find('Table').each(function (index) {

                    console.log($(this).find('Status').text());
                    console.log($(this).find('StrMessage').text());

                    var vrStatus = $(this).find('Status').text();

                    if (vrStatus == "E") {
                        awbExist = false;
                        var r = $(this).find('StrMessage').text();
                        r = r.replace("Error:", "");
                        $.alert(r);
                        return;
                    }
                });
            },
            error: function (msg) {
                // //debugger;
                // $("body").mLoading('hide');
                // var r = jQuery.parseJSON(msg.responseText);
                // $.alert(r.Message);
            }
        });


        if (awbExist == false)
            return;
    }

    ImagesXmlGen = '<FileData>';
    var ImagesXmlGen1 = '<FileData>';

    for (var n = 0; n < imageDataForArray.length; n++) {
        var j = n + 1;
        var fileNAme = "TLogo" + j.toString();
        ImagesXmlGen += "<Img FileName=" + '"' + fileNAme + '"'
            + " FileExtention= " + '"jpg"'
            + " Image= " + '"' + imageDataForArray[n] + '" ></Img>';
    }

    for (var n = 0; n < imageDataForArray.length; n++) {
        var j = n + 1;
        var fileNAme = "TLogo" + j.toString();
        ImagesXmlGen1 += "<Img FileName=" + '"' + fileNAme + '"'
            + " FileExtention= " + '"jpg"'
            + " Image= " + '"' + n.toString() + '" ></Img>';
    }

    ImagesXmlGen += "</FileData>";
    ImagesXmlGen1 += "</FileData>";

    console.log(ImagesXmlGen);
    console.log(ImagesXmlGen1);

    inputxml = '<ROOT><FileName>TLogo</FileName><FileExtention>jpg</FileExtention><FlightSeqNo>0</FlightSeqNo><AWBPrefix>'
        + MAWBNo.substring(0, 3) + '</AWBPrefix><Type>E</Type><AWBNo>' + MAWBNo.substring(3, MAWBNo.length)
        + '</AWBNo><ULDId>-1</ULDId><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></ROOT>';

    console.log(JSON.stringify({
        'InputXML': inputxml, 'InputImage': ImagesXmlGen1,
    }));

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAserviceURL + "SaveFileUploadDetails",
            data: JSON.stringify({
                'InputXML': inputxml, 'InputImage': ImagesXmlGen,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {

                // $.alert('File Saved Successfully');
                imageDataForArray = [];
                ImagesXmlGen = '';
                inputxml ='';
                $('#divImages').empty();
                var parser, xmlDoc;
                $("body").mLoading('hide');
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(response.d, "text/xml");
                var msg = xmlDoc.getElementsByTagName("StrMessage")[0].childNodes[0].nodeValue;
                $.alert(msg);

                imageDataForArray = [];
                ImagesXmlGen = '';
                inputxml = '';
                $('#divImages').empty();
                ClearAWBDetails();
                clearALL();
                //window.location.reload();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                console.log(msg);
                // $.alert('Some error occurred while saving data');
                // imageDataForArray = [];
                // ImagesXmlGen = '';
                // inputxml ='';
                // $('#divImages').empty();

            }
        });
        //  return false;
    }



}


function AddTableLocation(index, RId, RDes) {
    html += "<tr>";

    //html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + AWBNo + "</td>";
    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'><div id='ctl00_cp_gS_ctl02_ddlUNN_sl' class='drpDwn4Code dd_chk_select' style='display:inline-block;position:relative;'><div id='caption'>Select</div><div id='ctl00_cp_gS_ctl02_ddlUNN_dv' class='dd_chk_drop' style='position: absolute;'>";
    html += "<div id='checks'><span style='display:block;'></span><span id='ctl00_cp_gS_ctl02_ddlUNN'><input id='ctl00_cp_gS_ctl02_ddlUNN_" + index + " name='ctl00$cp$gS$ctl02$ddlUNN$" + index + "' value=" + RId + " type='checkbox'><label for='ctl00_cp_gS_ctl02_ddlUNN_" + index + "'>" + RDes + "</label></span></div></div></div></td>";
    //<input id=txtAWB_" + index + " class=form-control type=text style=text-align:right; value=" + AWBNo + " disabled></td>";
    html += "</tr>";

}

function ClearAWBDetails() {

    $('#txtAWBPrefix').val('');
    $('#txtAWBNo').val('');
    $('#txtPackages').val('');
    $('#txtWeight_FC').val('');
    $('#txtLocation_FC').val('');
    $('#txtOrigin_FC').val('');
    $('#txtDestination_FC').val('')
}

function clearALL() {
    $('#txtIGMNo').val('');
    $('#txtIGMYear').val('');
    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#txtTotCnts').val('');
    $('#txtManiPieces').val('');
    $('#txtReceivePieces').val('');
    $('#txtManiGrWt').val('');
    $('#txtReceiveGrWt').val('');
    $('#txtShortPieces').val('');
    $('#txtExcessPieces').val('');
    $('#txtDamagePieces').val('');
    
    $("#cameraTakePicture").removeAttr('disabled');
}

function MovetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function ClearFields() {
    $('.ClearFields input[type=text]').val("");
}









